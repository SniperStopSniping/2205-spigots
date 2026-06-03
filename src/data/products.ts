export type FinishName = "Satin" | "Matte Black";

export type ProductFinish = {
  name: FinishName;
  priceCents: number;
  priceId: string;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type ProductImagesByFinish = Partial<Record<FinishName, string[]>>;

export type Product = {
  name: string;
  slug: string;
  material: "SS2205" | "SS316";
  glassThickness: "10-12mm";
  weightKg: number;
  mainImage: string;
  imagesByFinish: ProductImagesByFinish;
  finishes: [ProductFinish, ProductFinish];
  shortDescription: string;
  descriptionBase: string;
  finishNotesByName: Record<FinishName, string>;
  titleByFinish: Record<FinishName, string>;
  metaDescriptionByFinish: Record<FinishName, string>;
  keyFeatures: string[];
  specifications: ProductSpecification[];
  applications: string[];
  faq: ProductFaq[];
};

export const PRODUCT_IMAGE_FALLBACK = "/images/product-placeholder.svg";

export const PRODUCTS: Product[] = [
  {
    name: "2205 Adjustable Base Spigot",
    slug: "2205-adjustable-base-spigot",
    material: "SS2205",
    glassThickness: "10-12mm",
    weightKg: 2.03,
    mainImage: "/images/2205 Spigot Silver 1.PNG",
    imagesByFinish: {
      Satin: [
        "/images/2205 Spigot Silver 1.PNG",
        "/images/2205 Spigot Silver 2.PNG",
        "/images/2205 Spigot Silver 3.PNG"
      ],
      "Matte Black": [
        "/images/2205 Spigot Black 1.PNG",
        "/images/2205 Spigot Black 2.PNG",
        "/images/2205 Spigot Black 3.PNG"
      ]
    },
    finishes: [
      { name: "Satin", priceCents: 3699, priceId: "price_spigot_satin_3699" },
      { name: "Matte Black", priceCents: 3999, priceId: "price_spigot_black_3999" }
    ],
    shortDescription:
      "Marine-grade Duplex 2205 stainless steel spigot with adjustable alignment for 10-12mm glass railing and fencing systems.",
    descriptionBase:
      "Crafted with marine-grade Duplex 2205 stainless steel, this adjustable base spigot is built for harsh outdoor environments with superior strength and anti-corrosion performance. The alignment system allows raise and lower adjustment plus front-to-back positioning so glass panels line up clean and true. Includes a base cover for a finished look.",
    finishNotesByName: {
      Satin: "Clean, low-maintenance satin finish.",
      "Matte Black": "Textured matte black finish with improved scratch resistance."
    },
    titleByFinish: {
      Satin: '6" Adjustable Glass Spigot - Duplex 2205 Stainless Steel | Satin Finish | 10-12mm Glass',
      "Matte Black": '6" Adjustable Glass Spigot - Duplex 2205 Stainless Steel | Matte Black | 10-12mm Glass'
    },
    metaDescriptionByFinish: {
      Satin:
        "High-quality 6 inch adjustable glass spigot in satin finish. Duplex 2205 stainless steel, corrosion-resistant, fits 10-12mm glass. Marine-grade.",
      "Matte Black":
        "Premium 6 inch adjustable glass spigot made from Duplex 2205 stainless steel. Matte black, corrosion-resistant, fits 10-12mm glass. Marine-grade quality."
    },
    keyFeatures: [
      "Marine-grade Duplex 2205 stainless steel",
      "Adjustable vertical and front-to-back alignment",
      "Compatible with 10-12mm tempered glass",
      "Includes matching base cover",
      "Weight 2.03kg",
      "Indoor and outdoor use"
    ],
    specifications: [
      { label: "Height", value: "6 inches" },
      { label: "Material", value: "Duplex 2205 Stainless Steel" },
      { label: "Glass Thickness", value: "10-12mm" },
      { label: "Weight", value: "2.03kg" },
      { label: "Finish", value: "Satin or Matte Black" },
      { label: "Installation Type", value: "Surface mounted" }
    ],
    applications: [
      "Balcony glass railings",
      "Deck and terrace railing systems",
      "Pool fencing and safety enclosures",
      "Commercial glass guardrail projects"
    ],
    faq: [
      {
        question: "Is this spigot suitable for outdoor and coastal projects?",
        answer:
          "Yes. Duplex 2205 stainless steel is selected for high corrosion resistance in demanding outdoor environments."
      },
      {
        question: "What glass thickness does this spigot support?",
        answer: "This model is designed for 10-12mm tempered glass panels."
      },
      {
        question: "Can I fine-tune panel alignment during installation?",
        answer:
          "Yes. The integrated adjustment mechanism supports vertical and front-to-back positioning for clean panel alignment."
      }
    ]
  },
  {
    name: "Adjustable Angle Glass-to-Glass Clamp",
    slug: "adjustable-angle-glass-to-glass-clamp",
    material: "SS2205",
    glassThickness: "10-12mm",
    weightKg: 0.46,
    mainImage: "/images/Adjustable glass to glass connector 1.PNG",
    imagesByFinish: {
      Satin: [
        "/images/Adjustable glass to glass connector 1.PNG",
        "/images/Adjustable glass to glass connector 2.PNG",
        "/images/Adjustable glass to glass connector 3.PNG"
      ]
    },
    finishes: [
      { name: "Satin", priceCents: 1499, priceId: "price_angle_satin_1499" },
      { name: "Matte Black", priceCents: 1799, priceId: "price_angle_black_1799" }
    ],
    shortDescription:
      "Marine-grade Duplex 2205 adjustable angle clamp for precise glass-to-glass alignment on 10-12mm frameless systems.",
    descriptionBase:
      "Built from marine-grade Duplex 2205 stainless steel, this adjustable angle clamp lets installers dial in clean panel alignment where angles vary. It is ideal for frameless glass railing corners and transitions, with durable corrosion resistance for exterior installations.",
    finishNotesByName: {
      Satin: "Satin finish with a clean, low-maintenance appearance.",
      "Matte Black": "Matte black textured finish for a modern look and extra scratch resistance."
    },
    titleByFinish: {
      Satin: "Adjustable Angle Glass-to-Glass Clamp - Duplex 2205 Stainless Steel | Satin | 10-12mm",
      "Matte Black": "Adjustable Angle Glass-to-Glass Clamp - Duplex 2205 Stainless Steel | Matte Black | 10-12mm"
    },
    metaDescriptionByFinish: {
      Satin:
        "Adjustable angle glass-to-glass clamp in Duplex 2205 stainless steel for 10-12mm glass. Satin finish, corrosion-resistant, installer-ready.",
      "Matte Black":
        "Adjustable angle glass-to-glass clamp in Duplex 2205 stainless steel for 10-12mm glass. Matte black textured finish, scratch-resistant."
    },
    keyFeatures: [
      "Duplex 2205 stainless steel",
      "Adjustable angle alignment",
      "Compatible with 10-12mm tempered glass",
      "Corrosion-resistant for outdoor use",
      "Weight 0.46kg",
      "Installer-focused fit and finish"
    ],
    specifications: [
      { label: "Material", value: "Duplex 2205 Stainless Steel" },
      { label: "Glass Thickness", value: "10-12mm" },
      { label: "Weight", value: "0.46kg" },
      { label: "Finish", value: "Satin or Matte Black" },
      { label: "Installation Type", value: "Glass-to-glass adjustable clamp" }
    ],
    applications: [
      "Frameless glass railing corners",
      "Angled glass transitions",
      "Balcony and stair glass systems",
      "Residential and commercial guardrails"
    ],
    faq: [
      {
        question: "When should I choose an adjustable angle clamp?",
        answer:
          "Use it where panel angles are not perfectly fixed and installers need precise glass-to-glass alignment."
      },
      {
        question: "Is this clamp compatible with exterior installations?",
        answer: "Yes. Duplex 2205 stainless steel is suitable for demanding outdoor conditions."
      },
      {
        question: "What glass thickness is supported?",
        answer: "This clamp is built for 10-12mm tempered glass."
      }
    ]
  },
  {
    name: "180° Glass-to-Glass Clamp",
    slug: "180-glass-to-glass-clamp",
    material: "SS2205",
    glassThickness: "10-12mm",
    weightKg: 0.33,
    mainImage: "/images/180 glass to glass connector 1.PNG",
    imagesByFinish: {
      Satin: [
        "/images/180 glass to glass connector 1.PNG",
        "/images/180 glass to glass connector 2.PNG",
        "/images/180 glass to glass connector 3.PNG",
        "/images/180 glass to glass connector 4.PNG"
      ]
    },
    finishes: [
      { name: "Satin", priceCents: 1199, priceId: "price_180_satin_1199" },
      { name: "Matte Black", priceCents: 1499, priceId: "price_180_black_1499" }
    ],
    shortDescription:
      "Straight-run 180 degree clamp in Duplex 2205 stainless steel for secure 10-12mm glass panel connections.",
    descriptionBase:
      "This straight-run 180 degree glass-to-glass clamp is made from marine-grade Duplex 2205 stainless steel for reliable strength and corrosion resistance. It is designed to keep inline frameless glass sections tight, clean, and consistent in outdoor railing and fencing projects.",
    finishNotesByName: {
      Satin: "Satin finish for a refined low-maintenance surface.",
      "Matte Black": "Textured matte black finish with strong visual contrast and scratch resistance."
    },
    titleByFinish: {
      Satin: "180° Glass-to-Glass Clamp - Duplex 2205 Stainless Steel | Satin | 10-12mm",
      "Matte Black": "180° Glass-to-Glass Clamp - Duplex 2205 Stainless Steel | Matte Black | 10-12mm"
    },
    metaDescriptionByFinish: {
      Satin:
        "180° glass-to-glass clamp in Duplex 2205 stainless steel for straight panel runs. Fits 10-12mm glass, satin finish, corrosion resistant.",
      "Matte Black":
        "180° glass-to-glass clamp in Duplex 2205 stainless steel for straight panel runs. Fits 10-12mm glass, textured matte black finish."
    },
    keyFeatures: [
      "Duplex 2205 stainless steel",
      "180 degree straight alignment",
      "Compatible with 10-12mm tempered glass",
      "Corrosion-resistant outdoor performance",
      "Weight 0.33kg",
      "Clean frameless inline appearance"
    ],
    specifications: [
      { label: "Material", value: "Duplex 2205 Stainless Steel" },
      { label: "Glass Thickness", value: "10-12mm" },
      { label: "Weight", value: "0.33kg" },
      { label: "Finish", value: "Satin or Matte Black" },
      { label: "Installation Type", value: "Glass-to-glass inline clamp" }
    ],
    applications: [
      "Straight balcony railing runs",
      "Deck and perimeter guardrail systems",
      "Frameless glass fencing lines",
      "Commercial inline panel layouts"
    ],
    faq: [
      {
        question: "What is a 180 degree glass clamp used for?",
        answer: "It joins glass panels in straight inline runs for clean, continuous railing or fencing sections."
      },
      {
        question: "Can this clamp be used outside year-round?",
        answer: "Yes. Duplex 2205 construction is intended for high-corrosion outdoor environments."
      },
      {
        question: "Does it fit 12mm tempered glass?",
        answer: "Yes. It supports 10-12mm tempered glass."
      }
    ]
  },
  {
    name: "90° Glass-to-Glass Clamp",
    slug: "90-glass-to-glass-clamp",
    material: "SS2205",
    glassThickness: "10-12mm",
    weightKg: 0.31,
    mainImage: "/images/90 glass to glass.PNG",
    imagesByFinish: {
      Satin: [
        "/images/90 glass to glass.PNG",
        "/images/90 glass to glass 1.PNG",
        "/images/90 glass to glass 2.PNG"
      ]
    },
    finishes: [
      { name: "Satin", priceCents: 1199, priceId: "price_90_satin_1199" },
      { name: "Matte Black", priceCents: 1399, priceId: "price_90_black_1399" }
    ],
    shortDescription:
      "Durable 90 degree corner clamp in Duplex 2205 stainless steel for 10-12mm frameless glass railing systems.",
    descriptionBase:
      "This 90 degree corner clamp is manufactured from marine-grade Duplex 2205 stainless steel to handle demanding exterior conditions. It provides reliable corner transitions for frameless glass railing systems while keeping alignment clean and consistent.",
    finishNotesByName: {
      Satin: "Satin finish for a clean architectural appearance.",
      "Matte Black": "Textured matte black finish for modern projects and better scratch resistance."
    },
    titleByFinish: {
      Satin: "90° Glass-to-Glass Clamp - Duplex 2205 Stainless Steel | Satin | 10-12mm",
      "Matte Black": "90° Glass-to-Glass Clamp - Duplex 2205 Stainless Steel | Matte Black | 10-12mm"
    },
    metaDescriptionByFinish: {
      Satin:
        "90° corner glass-to-glass clamp in Duplex 2205 stainless steel. Fits 10-12mm glass, satin finish, corrosion-resistant for outdoor railings.",
      "Matte Black":
        "90° corner glass-to-glass clamp in Duplex 2205 stainless steel. Fits 10-12mm glass, textured matte black finish, scratch-resistant."
    },
    keyFeatures: [
      "Duplex 2205 stainless steel",
      "90 degree corner transition",
      "Compatible with 10-12mm tempered glass",
      "Corrosion-resistant outdoor durability",
      "Weight 0.31kg",
      "Professional frameless corner detailing"
    ],
    specifications: [
      { label: "Material", value: "Duplex 2205 Stainless Steel" },
      { label: "Glass Thickness", value: "10-12mm" },
      { label: "Weight", value: "0.31kg" },
      { label: "Finish", value: "Satin or Matte Black" },
      { label: "Installation Type", value: "Glass-to-glass corner clamp" }
    ],
    applications: [
      "Corner balcony railings",
      "Pool and terrace corner panels",
      "Frameless stair landing corners",
      "Commercial corner guardrails"
    ],
    faq: [
      {
        question: "Where is the 90 degree clamp typically installed?",
        answer: "It is used at corner transitions where two glass panels meet at a right angle."
      },
      {
        question: "Is this hardware suitable for marine environments?",
        answer: "Yes. Duplex 2205 stainless steel is chosen for high corrosion resistance."
      },
      {
        question: "What glass thickness does it support?",
        answer: "This clamp is compatible with 10-12mm tempered glass."
      }
    ]
  },
  {
    name: "Glass-to-Wall Clamp",
    slug: "glass-to-wall-clamp",
    material: "SS2205",
    glassThickness: "10-12mm",
    weightKg: 0.22,
    mainImage: "/images/90 glass to wall connector.PNG",
    imagesByFinish: {
      Satin: [
        "/images/90 glass to wall connector.PNG",
        "/images/90 glass to wall connector 1.PNG",
        "/images/90 glass to wall connector 2.PNG"
      ]
    },
    finishes: [
      { name: "Satin", priceCents: 999, priceId: "price_wall_satin_999" },
      { name: "Matte Black", priceCents: 1099, priceId: "price_wall_black_1099" }
    ],
    shortDescription:
      "Compact glass-to-wall clamp in Duplex 2205 stainless steel for secure 10-12mm panel termination points.",
    descriptionBase:
      "This glass-to-wall clamp is built from marine-grade Duplex 2205 stainless steel for dependable strength and corrosion resistance in Canadian outdoor conditions. It provides a clean and secure termination where glass panels meet a wall or structural surface.",
    finishNotesByName: {
      Satin: "Satin finish for clean architectural integration.",
      "Matte Black": "Textured matte black finish for bold contrast and wear resistance."
    },
    titleByFinish: {
      Satin: "Glass-to-Wall Clamp - Duplex 2205 Stainless Steel | Satin | 10-12mm",
      "Matte Black": "Glass-to-Wall Clamp - Duplex 2205 Stainless Steel | Matte Black | 10-12mm"
    },
    metaDescriptionByFinish: {
      Satin:
        "Glass-to-wall clamp in Duplex 2205 stainless steel for frameless glass railing. Fits 10-12mm glass, satin finish, corrosion-resistant.",
      "Matte Black":
        "Glass-to-wall clamp in Duplex 2205 stainless steel for frameless glass railing. Fits 10-12mm glass, textured matte black finish."
    },
    keyFeatures: [
      "Duplex 2205 stainless steel",
      "Glass-to-wall mounting",
      "Compatible with 10-12mm tempered glass",
      "Outdoor corrosion resistance",
      "Weight 0.22kg",
      "Clean end-of-run detailing"
    ],
    specifications: [
      { label: "Material", value: "Duplex 2205 Stainless Steel" },
      { label: "Glass Thickness", value: "10-12mm" },
      { label: "Weight", value: "0.22kg" },
      { label: "Finish", value: "Satin or Matte Black" },
      { label: "Installation Type", value: "Glass-to-wall clamp" }
    ],
    applications: [
      "Wall termination points in railings",
      "Balcony and deck panel endpoints",
      "Frameless fence boundary sections",
      "Residential and commercial projects"
    ],
    faq: [
      {
        question: "What is a glass-to-wall clamp used for?",
        answer: "It secures a glass panel where the run ends against a wall or fixed structure."
      },
      {
        question: "Can this clamp be used outdoors?",
        answer: "Yes. Duplex 2205 material is suitable for outdoor and high-moisture installations."
      },
      {
        question: "Which glass thickness works with this clamp?",
        answer: "This clamp supports 10-12mm tempered glass."
      }
    ]
  },
  {
    name: "Self-Closing Glass Gate Hinges",
    slug: "self-closing-glass-gate-hinges",
    material: "SS316",
    glassThickness: "10-12mm",
    weightKg: 1.26,
    mainImage: PRODUCT_IMAGE_FALLBACK,
    imagesByFinish: {},
    finishes: [
      { name: "Satin", priceCents: 4899, priceId: "price_hinge_satin_4899" },
      { name: "Matte Black", priceCents: 5499, priceId: "price_hinge_black_5499" }
    ],
    shortDescription:
      "SS316 self-closing glass gate hinges for smooth and reliable closure on 10-12mm outdoor gate panels.",
    descriptionBase:
      "Made from SS316 stainless steel for dependable corrosion resistance, these self-closing glass gate hinges are engineered for smooth and consistent closing performance. They are ideal for exterior gate applications, including pool and safety fence gates that require reliable day-to-day operation.",
    finishNotesByName: {
      Satin: "Satin finish for a clean and professional architectural look.",
      "Matte Black": "Matte black finish for modern gate systems with added visual contrast."
    },
    titleByFinish: {
      Satin: "Self-Closing Glass Gate Hinges - 316 Stainless Steel | Satin | 10-12mm",
      "Matte Black": "Self-Closing Glass Gate Hinges - 316 Stainless Steel | Matte Black | 10-12mm"
    },
    metaDescriptionByFinish: {
      Satin:
        "Self-closing glass gate hinges in 316 stainless steel for 10-12mm glass. Satin finish, corrosion resistant, ideal for gates and pool fencing.",
      "Matte Black":
        "Self-closing glass gate hinges in 316 stainless steel for 10-12mm glass. Matte black finish, durable and corrosion resistant."
    },
    keyFeatures: [
      "316 stainless steel corrosion resistance",
      "Self-closing gate function",
      "Compatible with 10-12mm tempered glass",
      "Smooth and controlled closing action",
      "Weight 1.26kg",
      "Indoor and outdoor suitability"
    ],
    specifications: [
      { label: "Material", value: "SS316 Stainless Steel" },
      { label: "Glass Thickness", value: "10-12mm" },
      { label: "Weight", value: "1.26kg" },
      { label: "Finish", value: "Satin or Matte Black" },
      { label: "Installation Type", value: "Glass gate hinge" }
    ],
    applications: [
      "Frameless glass entry gates",
      "Pool gate systems",
      "Balcony and terrace gate sections",
      "Commercial safety gate installations"
    ],
    faq: [
      {
        question: "Why is SS316 used for gate hinges?",
        answer:
          "SS316 provides strong corrosion resistance, making it well suited for outdoor and poolside gate hardware."
      },
      {
        question: "Do these hinges support 10-12mm glass gates?",
        answer: "Yes. They are built for 10-12mm tempered glass gate panels."
      },
      {
        question: "Are they suitable for pool safety gate projects?",
        answer: "Yes. The self-closing function and corrosion resistance make them a strong choice for pool fence gates."
      }
    ]
  },
  {
    name: "Glass-to-Glass Gate Lock",
    slug: "glass-to-glass-gate-lock",
    material: "SS2205",
    glassThickness: "10-12mm",
    weightKg: 0.85,
    mainImage: "/images/Glass to glass gate lock 1.PNG",
    imagesByFinish: {
      Satin: [
        "/images/Glass to glass gate lock 1.PNG",
        "/images/Glass to glass gate lock 2.PNG",
        "/images/Glass to glass gate lock 3.PNG"
      ]
    },
    finishes: [
      { name: "Satin", priceCents: 3999, priceId: "price_lock_satin_3999" },
      { name: "Matte Black", priceCents: 4299, priceId: "price_lock_black_4299" }
    ],
    shortDescription:
      "Secure Duplex 2205 glass-to-glass gate lock for 10-12mm panels in premium frameless gate systems.",
    descriptionBase:
      "A robust glass-to-glass gate lock made from marine-grade Duplex 2205 stainless steel for high strength and corrosion resistance. It is engineered for secure closure where a moving glass gate meets an adjacent fixed glass panel in outdoor gate systems.",
    finishNotesByName: {
      Satin: "Satin finish for clean, low-maintenance gate hardware styling.",
      "Matte Black": "Textured matte black finish with durable scratch-resistant character."
    },
    titleByFinish: {
      Satin: "Glass-to-Glass Gate Lock - Duplex 2205 Stainless Steel | Satin | 10-12mm",
      "Matte Black": "Glass-to-Glass Gate Lock - Duplex 2205 Stainless Steel | Matte Black | 10-12mm"
    },
    metaDescriptionByFinish: {
      Satin:
        "Glass-to-glass gate lock in Duplex 2205 stainless steel for 10-12mm glass. Satin finish, strong and corrosion-resistant for outdoor gates.",
      "Matte Black":
        "Glass-to-glass gate lock in Duplex 2205 stainless steel for 10-12mm glass. Textured matte black finish, durable and scratch-resistant."
    },
    keyFeatures: [
      "Duplex 2205 stainless steel",
      "Secure glass-to-glass gate locking",
      "Compatible with 10-12mm tempered glass",
      "Corrosion-resistant exterior durability",
      "Weight 0.85kg",
      "Suitable for residential and commercial gates"
    ],
    specifications: [
      { label: "Material", value: "Duplex 2205 Stainless Steel" },
      { label: "Glass Thickness", value: "10-12mm" },
      { label: "Weight", value: "0.85kg" },
      { label: "Finish", value: "Satin or Matte Black" },
      { label: "Installation Type", value: "Glass-to-glass gate lock" }
    ],
    applications: [
      "Frameless glass gate systems",
      "Pool and safety gate enclosures",
      "Balcony access gates",
      "Commercial perimeter gate sections"
    ],
    faq: [
      {
        question: "Where is a glass-to-glass gate lock installed?",
        answer: "It is used where a glass gate panel closes against another fixed glass panel."
      },
      {
        question: "Is this lock suitable for outdoor projects?",
        answer: "Yes. Duplex 2205 construction supports long-term outdoor corrosion resistance."
      },
      {
        question: "What panel thickness does this lock support?",
        answer: "This lock is designed for 10-12mm tempered glass."
      }
    ]
  }
];

export const SHIPPING_RULES = {
  freeThresholdCents: 15000,
  ontario: {
    priceCents: 1499,
    priceId: "price_ship_on_1499"
  },
  restOfCanada: {
    priceCents: 2499,
    priceId: "price_ship_ca_2499"
  }
} as const;

export const PROVINCES = [
  { code: "ON", label: "Ontario" },
  { code: "BC", label: "British Columbia" },
  { code: "AB", label: "Alberta" },
  { code: "MB", label: "Manitoba" },
  { code: "SK", label: "Saskatchewan" },
  { code: "QC", label: "Quebec" },
  { code: "NB", label: "New Brunswick" },
  { code: "NS", label: "Nova Scotia" },
  { code: "PE", label: "Prince Edward Island" },
  { code: "NL", label: "Newfoundland and Labrador" },
  { code: "YT", label: "Yukon" },
  { code: "NT", label: "Northwest Territories" },
  { code: "NU", label: "Nunavut" }
] as const;

export const PRODUCTS_BY_SLUG: Record<string, Product> = Object.fromEntries(PRODUCTS.map((product) => [product.slug, product]));

export const getProductBySlug = (slug: string): Product | undefined => PRODUCTS_BY_SLUG[slug];

export const getFinishByName = (product: Product, finishName: FinishName): ProductFinish | undefined =>
  product.finishes.find((finish) => finish.name === finishName);

const hasImages = (images: string[] | undefined): images is string[] => Array.isArray(images) && images.length > 0;

export const getProductImagesForFinish = (product: Product, finishName: FinishName): string[] => {
  const selectedFinishImages = product.imagesByFinish[finishName];
  if (hasImages(selectedFinishImages)) {
    return selectedFinishImages;
  }

  const satinImages = product.imagesByFinish.Satin;
  if (hasImages(satinImages)) {
    return satinImages;
  }

  return [product.mainImage || PRODUCT_IMAGE_FALLBACK];
};

export const getProductMainImage = (product: Product): string => getProductImagesForFinish(product, "Satin")[0];

export const getProductImageForFinish = (product: Product, finishName: FinishName): string =>
  getProductImagesForFinish(product, finishName)[0];

export const isFinishName = (value: string | null | undefined): value is FinishName =>
  value === "Satin" || value === "Matte Black";

export const normalizeFinishName = (value: string | null | undefined): FinishName =>
  isFinishName(value) ? value : "Satin";
