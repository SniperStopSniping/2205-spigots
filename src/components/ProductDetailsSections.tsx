import Link from "next/link";

import type { FinishName, Product } from "@/data/products";

type ProductDetailsSectionsProps = {
  product: Product;
  finish: FinishName;
};

export function ProductDetailsSections({ product, finish }: ProductDetailsSectionsProps) {
  return (
    <section className="mx-auto mt-8 max-w-6xl space-y-8 px-6 pb-14 md:mt-10 md:space-y-10 md:px-8 md:pb-16">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">Product Description</h2>
        <div className="mt-3 space-y-3 text-sm leading-6 text-neutral-700 md:text-base md:leading-7">
          <p>{product.descriptionBase}</p>
          <p>{product.finishNotesByName[finish]}</p>
          <p>
            Built for{" "}
            <Link href="/glass-railing-systems" className="text-blue-700 hover:text-blue-800">
              glass railing systems
            </Link>
            ,{" "}
            <Link href="/glass-fencing" className="text-blue-700 hover:text-blue-800">
              glass fencing
            </Link>
            ,{" "}
            <Link href="/pool-fencing" className="text-blue-700 hover:text-blue-800">
              pool fencing
            </Link>
            , and{" "}
            <Link href="/balcony-glass-railings" className="text-blue-700 hover:text-blue-800">
              balcony glass railings
            </Link>{" "}
            in Canada.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold md:text-2xl">Key Features</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700 md:text-base md:leading-7">
          {product.keyFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold md:text-2xl">Specifications</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200">
          <table className="w-full border-collapse text-left text-sm md:text-base">
            <tbody>
              {product.specifications.map((spec) => (
                <tr key={spec.label} className="border-b border-neutral-200 last:border-b-0">
                  <th className="w-1/3 bg-neutral-50 px-4 py-3 font-semibold text-neutral-900 md:px-5">{spec.label}</th>
                  <td className="px-4 py-3 text-neutral-700 md:px-5">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold md:text-2xl">Applications</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700 md:text-base md:leading-7">
          {product.applications.map((application) => (
            <li key={application}>{application}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold md:text-2xl">FAQ</h2>
        <div className="mt-3 space-y-4">
          {product.faq.map((item) => (
            <div key={item.question} className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-5">
              <p className="text-sm font-semibold text-neutral-900 md:text-base">{item.question}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-700 md:text-base md:leading-7">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
