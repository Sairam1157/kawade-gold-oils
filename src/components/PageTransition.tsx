import { useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 250);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`transition-all duration-[250ms] ease-out ${
        transitioning
          ? "opacity-0 translate-y-3 blur-[2px]"
          : "opacity-100 translate-y-0 blur-0"
      }`}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
