import type { ReactNode } from "react";

type InfoStripProps = {
  children: ReactNode;
  className?: string;
};

export function InfoStrip({ children, className }: InfoStripProps) {
  return (
    <div className={`w-full bg-slate-50 border-b border-neutral-200 py-2 ${className ?? ""}`}>
      <div className="mx-auto max-w-6xl px-6 text-center text-[11px] font-semibold leading-4 text-neutral-600 md:px-8 md:text-[12px] md:leading-5">
        {children}
      </div>
    </div>
  );
}
