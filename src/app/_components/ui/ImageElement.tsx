"use client";
import Image from "next/image";
import { useState } from "react";
import { memo } from "react";
interface props2 {
  src: string;
  className?: string;
  alt: string;
}
export const ImageElement = memo(function ImageElement({ src, className, alt }: props2) {
  const [imageError, setImageError] = useState(false);
  return (
    <>
      {!imageError ? (
        <Image
          fill
          src={src}
          alt={alt}
          sizes="100%"
          className={`object-cover ${className} dark:brightness-75`}
          onError={() => setImageError(true)}
        />
      ) : (
        <Image
          fill
          src="/missingImage.jpg"
          alt={alt}
          sizes="100%"
          className={`object-cover ${className}`}
          onError={() => setImageError(true)}
        />
      )}
    </>
  );
});
