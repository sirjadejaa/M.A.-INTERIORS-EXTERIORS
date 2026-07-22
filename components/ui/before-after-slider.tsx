"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    [containerRef]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/9] w-full overflow-hidden select-none cursor-ew-resize rounded-lg border border-[#E2E8F0] ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full Background) */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={afterImage}
          alt="After Renovation"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
          priority
        />
        <div className="absolute right-4 bottom-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded text-white text-[10px] uppercase font-sans tracking-widest">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* We use a fixed width container matching the slider container to avoid image squishing */}
        <div className="absolute inset-0 w-full h-full aspect-[16/9] min-w-[300px]">
          <Image
            src={beforeImage}
            alt="Before Renovation"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute left-4 bottom-4 z-10 px-3 py-1 bg-[#D4AF37]/90 backdrop-blur-md rounded text-white text-[10px] uppercase font-sans tracking-widest">
            {beforeLabel}
          </div>
        </div>
      </div>

      {/* Slider Line handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-[#D4AF37] z-20 cursor-ew-resize pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0A192F] text-[#F0F4F8] border border-[#D4AF37] rounded-full flex items-center justify-center shadow-lg font-sans text-xs">
          ↔
        </div>
      </div>
    </div>
  );
}
