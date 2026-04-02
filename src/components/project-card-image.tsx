"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type ProjectCardImageProps = {
  src: string | null;
  alt: string;
  className?: string;
  unoptimized?: boolean;
};

const FALLBACK_IMAGE = "/heroHome.jpg";

function normalizeSrc(src: string | null) {
  const value = src?.trim();
  return value ? value : FALLBACK_IMAGE;
}

export function ProjectCardImage({ src, alt, className }: ProjectCardImageProps) {
  const initialSrc = useMemo(() => normalizeSrc(src), [src]);
  const [imageSrc, setImageSrc] = useState(initialSrc);

  const shouldBypassOptimization = useMemo(() => {
    if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://")) return true;
    return false;
  }, [imageSrc]);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={900}
      height={1125}
      className={className}
      unoptimized={shouldBypassOptimization}
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) {
          setImageSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}
