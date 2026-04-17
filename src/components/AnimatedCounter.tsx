import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

const AnimatedCounter = ({ value, label }: AnimatedCounterProps) => {
  const { ref, display } = useAnimatedCounter(value);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold gold-text-gradient tabular-nums">
        {display}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

export default AnimatedCounter;
