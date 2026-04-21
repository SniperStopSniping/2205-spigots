"use client";

type QuantityStepperProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  small?: boolean;
};

export function QuantityStepper({ quantity, onDecrease, onIncrease, small = false }: QuantityStepperProps) {
  return (
    <div
      className={[
        "inline-flex items-center rounded-full bg-neutral-100 p-1",
        small ? "text-sm" : "text-base"
      ].join(" ")}
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={onDecrease}
        className="h-9 w-9 rounded-full text-neutral-900 transition hover:bg-white active:bg-blue-50 active:text-blue-700"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="min-w-10 text-center font-medium text-neutral-900">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        className="h-9 w-9 rounded-full text-neutral-900 transition hover:bg-white active:bg-blue-50 active:text-blue-700"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
