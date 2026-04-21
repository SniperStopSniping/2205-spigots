type GoogleMapEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

export function GoogleMapEmbed({ src, title, className }: GoogleMapEmbedProps) {
  return (
    <div
      className={[
        "w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        "aspect-[4/3] md:aspect-[16/7]",
        className ?? ""
      ].join(" ")}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}
