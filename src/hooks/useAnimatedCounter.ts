import { useEffect, useRef, useState } from "react";

export function useAnimatedCounter(target: string, duration = 1500) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(el);

          const numericMatch = target.match(/[\d.]+/);
          if (!numericMatch) {
            setDisplay(target);
            return;
          }

          const endVal = parseFloat(numericMatch[0]);
          const prefix = target.slice(0, target.indexOf(numericMatch[0]));
          const suffix = target.slice(target.indexOf(numericMatch[0]) + numericMatch[0].length);
          const isFloat = numericMatch[0].includes(".");
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * endVal;
            setDisplay(`${prefix}${isFloat ? current.toFixed(1) : Math.floor(current)}${suffix}`);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, display };
}
