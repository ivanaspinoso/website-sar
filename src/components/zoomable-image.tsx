"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  unoptimized?: boolean;
};

export function ZoomableImage({ src, alt, width, height, className, unoptimized }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto block w-fit cursor-zoom-in border-0 bg-transparent p-0"
        aria-label={`Ampliar imagen: ${alt}`}
      >
        <Image src={src} alt={alt} width={width} height={height} className={className} unoptimized={unoptimized} />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full border border-white/40 bg-black/45 px-3 py-1 text-sm text-white transition hover:bg-black/70"
            aria-label="Cerrar imagen ampliada"
          >
            Cerrar
          </button>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto max-h-[92vh] w-auto max-w-[92vw] object-contain"
            unoptimized={unoptimized}
          />
        </div>
      ) : null}
    </>
  );
}
