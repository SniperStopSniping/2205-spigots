"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import { getFinishByName, getProductBySlug, getProductImageForFinish, type FinishName } from "@/data/products";

type StoredCartItem = {
  productSlug: string;
  finish: FinishName;
  quantity: number;
};

export type CheckoutCartItem = {
  productSlug: string;
  finish: FinishName;
  quantity: number;
};

export type CartLineItem = {
  key: string;
  productSlug: string;
  name: string;
  image: string;
  material: string;
  glassThickness: string;
  weightKg: number;
  finish: FinishName;
  unitPriceCents: number;
  quantity: number;
};

type CartContextValue = {
  isReady: boolean;
  items: CartLineItem[];
  checkoutItems: CheckoutCartItem[];
  itemCount: number;
  subtotalCents: number;
  floatingCtaVisible: boolean;
  toastMessage: string | null;
  toastToken: number;
  addItem: (productSlug: string, finish: FinishName) => void;
  setItemQuantity: (productSlug: string, finish: FinishName, quantity: number) => void;
  removeItem: (productSlug: string, finish: FinishName) => void;
  clearCart: () => void;
  getQuantity: (productSlug: string, finish: FinishName) => number;
  closeFloatingCta: () => void;
  dismissToast: () => void;
};

const STORAGE_KEY = "spigots-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

const isFinishName = (value: unknown): value is FinishName => value === "Satin" || value === "Matte Black";

const normalizeStoredItems = (value: unknown): StoredCartItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalized: StoredCartItem[] = [];

  for (const item of value) {
    if (typeof item !== "object" || item === null) {
      continue;
    }

    const record = item as Record<string, unknown>;
    const productSlug = typeof record.productSlug === "string" ? record.productSlug : "";
    const finish = record.finish;
    const quantity = typeof record.quantity === "number" ? Math.floor(record.quantity) : 0;

    if (!productSlug || !isFinishName(finish) || quantity <= 0) {
      continue;
    }

    const product = getProductBySlug(productSlug);
    if (!product || !getFinishByName(product, finish)) {
      continue;
    }

    normalized.push({ productSlug, finish, quantity });
  }

  return normalized;
};

const makeItemKey = (productSlug: string, finish: FinishName): string => `${productSlug}__${finish}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [storedItems, setStoredItems] = useState<StoredCartItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [floatingCtaVisible, setFloatingCtaVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastToken, setToastToken] = useState(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setIsReady(true);
        return;
      }

      const parsed = JSON.parse(raw);
      setStoredItems(normalizeStoredItems(parsed));
    } catch {
      setStoredItems([]);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
  }, [storedItems, isReady]);

  const addItem = useCallback((productSlug: string, finish: FinishName) => {
    setStoredItems((prev) => {
      const index = prev.findIndex((item) => item.productSlug === productSlug && item.finish === finish);
      if (index >= 0) {
        const updated = [...prev];
        const current = updated[index];
        updated[index] = { ...current, quantity: current.quantity + 1 };
        return updated;
      }

      return [...prev, { productSlug, finish, quantity: 1 }];
    });

    setFloatingCtaVisible(true);
    setToastMessage("Added to cart");
    setToastToken(Date.now());
  }, []);

  const setItemQuantity = useCallback((productSlug: string, finish: FinishName, quantity: number) => {
    setStoredItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => !(item.productSlug === productSlug && item.finish === finish));
      }

      const index = prev.findIndex((item) => item.productSlug === productSlug && item.finish === finish);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity };
        return updated;
      }

      return [...prev, { productSlug, finish, quantity }];
    });
  }, []);

  const removeItem = useCallback((productSlug: string, finish: FinishName) => {
    setStoredItems((prev) => prev.filter((item) => !(item.productSlug === productSlug && item.finish === finish)));
  }, []);

  const clearCart = useCallback(() => {
    setStoredItems([]);
  }, []);

  const dismissToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const closeFloatingCta = useCallback(() => {
    setFloatingCtaVisible(false);
  }, []);

  const items = useMemo<CartLineItem[]>(() => {
    const resolved: CartLineItem[] = [];

    for (const item of storedItems) {
      const product = getProductBySlug(item.productSlug);
      if (!product) {
        continue;
      }

      const finish = getFinishByName(product, item.finish);
      if (!finish) {
        continue;
      }

      resolved.push({
        key: makeItemKey(item.productSlug, item.finish),
        productSlug: item.productSlug,
        name: product.name,
        image: getProductImageForFinish(product, item.finish),
        material: product.material,
        glassThickness: product.glassThickness,
        weightKg: product.weightKg,
        finish: item.finish,
        unitPriceCents: finish.priceCents,
        quantity: item.quantity
      });
    }

    return resolved;
  }, [storedItems]);

  const checkoutItems = useMemo<CheckoutCartItem[]>(
    () => items.map((item) => ({ productSlug: item.productSlug, finish: item.finish, quantity: item.quantity })),
    [items]
  );

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const subtotalCents = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0),
    [items]
  );

  const getQuantity = useCallback(
    (productSlug: string, finish: FinishName) => {
      const existing = storedItems.find((item) => item.productSlug === productSlug && item.finish === finish);
      return existing?.quantity ?? 0;
    },
    [storedItems]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      isReady,
      items,
      checkoutItems,
      itemCount,
      subtotalCents,
      floatingCtaVisible,
      toastMessage,
      toastToken,
      addItem,
      setItemQuantity,
      removeItem,
      clearCart,
      getQuantity,
      closeFloatingCta,
      dismissToast
    }),
    [
      isReady,
      items,
      checkoutItems,
      itemCount,
      subtotalCents,
      floatingCtaVisible,
      toastMessage,
      toastToken,
      addItem,
      setItemQuantity,
      removeItem,
      clearCart,
      getQuantity,
      closeFloatingCta,
      dismissToast
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
