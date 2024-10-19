"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils";
import { motion } from "framer-motion";

export default function MicFFT({
  fft,
  className,
}: {
  fft: number[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({
        width: offsetWidth,
        height: offsetHeight,
      });

      const handleResize = () => {
        setDimensions({
          width: containerRef.current?.offsetWidth || 0,
          height: containerRef.current?.offsetHeight || 0,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [containerRef]);

  const { width, height } = dimensions;

  return (
    <div ref={containerRef} className={"relative size-full"}>
      <motion.svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className={cn("absolute !inset-0 !size-full", className)}
      >
        {Array.from({ length: 24 }).map((_, index) => {
          const value = (fft[index] ?? 0) / 4;
          const h = Math.min(Math.max(height * value, 2), height);
          const yOffset = height * 0.5 - h * 0.5;

          return (
            <motion.rect
              key={`mic-fft-${index}`}
              height={h}
              width={2}
              x={2 + (index * width - 4) / 24}
              y={yOffset}
              rx={4}
            />
          );
        })}
      </motion.svg>
    </div>
  );
}