"use client";

import { GraduationCap, Monitor, Award } from "lucide-react";
import { useRef, useEffect } from "react";

export function ScrollableBadges() {
  const leftFadeRef = useRef<HTMLDivElement>(null);
  const rightFadeRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const updateGradients = () => {
    if (
      leftFadeRef.current &&
      rightFadeRef.current &&
      scrollContainerRef.current
    ) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const maxScroll =
        scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth;

      // Only show gradients if content actually overflows
      if (maxScroll > 0) {
        // Show left fade if not at the beginning
        leftFadeRef.current.style.opacity = scrollLeft > 10 ? "1" : "0";

        // Show right fade if not at the end
        rightFadeRef.current.style.opacity =
          scrollLeft < maxScroll - 10 ? "1" : "0";
      } else {
        // No overflow, hide both gradients
        leftFadeRef.current.style.opacity = "0";
        rightFadeRef.current.style.opacity = "0";
      }
    }
  };

  const handleScroll = () => {
    updateGradients();
  };

  useEffect(() => {
    // Check for overflow on mount and resize
    updateGradients();

    const handleResize = () => {
      updateGradients();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mb-10">
      <div className="relative">
        {/* Left fade gradient */}
        <div
          ref={leftFadeRef}
          className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent z-10 pointer-events-none opacity-0 transition-opacity duration-300"
        ></div>

        {/* Right fade gradient */}
        <div
          ref={rightFadeRef}
          className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900/80 via-slate-900/40 to-transparent z-10 pointer-events-none opacity-0 transition-opacity duration-300"
        ></div>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          onScroll={handleScroll}
        >
          <div className="flex justify-center items-center gap-3 min-w-max px-4">
            <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 px-4 py-2 rounded-full flex items-center gap-2 flex-shrink-0">
              <GraduationCap className="h-4 w-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium whitespace-nowrap">
                Especialistas
              </span>
            </div>
            <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 px-4 py-2 rounded-full flex items-center gap-2 flex-shrink-0">
              <Monitor className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium whitespace-nowrap">
                24/7 Monitoreo
              </span>
            </div>
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 px-4 py-2 rounded-full flex items-center gap-2 flex-shrink-0">
              <Award className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium whitespace-nowrap">
                +10 años
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
