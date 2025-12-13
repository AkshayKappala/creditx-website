import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { LuGithub, LuMenu, LuZap } from "react-icons/lu";
import { Button } from "./ui/button";

const NAV_ITEMS = [
  { id: "architecture", label: "Architecture" },
  { id: "flow", label: "Flow" },
  { id: "features", label: "Features" },
  { id: "tech", label: "Tech Stack" },
  { id: "api-usage", label: "API Usage" },
];

export function Navigation() {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const linksContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [highlightRect, setHighlightRect] = useState({ left: 0, width: 0 });
  const highlightVisible = activeSection !== null;
  const APPEAR_THRESHOLD = 0.3;
  const DISAPPEAR_THRESHOLD = 0.2;
  const SWITCH_DELTA = 0.08;
  const rafRef = useRef<number | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const heroRef = useRef<HTMLElement | null>(null);
  const activeSectionRef = useRef<string | null>(null);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    sectionsRef.current = NAV_ITEMS.map((item) => document.getElementById(item.id));
    heroRef.current = document.getElementById("hero");
    const getVisibleRatio = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visible = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
      const denominator = Math.min(rect.height, viewportHeight) || 1;
      return visible / denominator;
    };

    const tick = () => {
      rafRef.current = null;

      const heroRatio = heroRef.current ? getVisibleRatio(heroRef.current) : 0;
      if (heroRatio >= APPEAR_THRESHOLD) {
        setActiveSection((prev) => (prev === null ? prev : null));
        return;
      }

      let maxRatio = 0;
      let maxId: string | null = null;
      let currentRatio = 0;

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        const ratio = getVisibleRatio(section);
        const id = NAV_ITEMS[index].id;
        if (id === activeSectionRef.current) {
          currentRatio = ratio;
        }
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxId = id;
        }
      });

      const currentId = activeSectionRef.current;

      if (maxId && maxRatio >= APPEAR_THRESHOLD) {
        const shouldSwitch = !currentId || maxId === currentId || maxRatio >= currentRatio + SWITCH_DELTA;
        if (shouldSwitch) {
          setActiveSection((prev) => (prev === maxId ? prev : maxId));
        }
        return;
      }

      if (maxRatio <= DISAPPEAR_THRESHOLD) {
        setActiveSection((prev) => (prev === null ? prev : null));
      }
    };

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    // Compute once on mount.
    tick();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const updateHighlight = useCallback(() => {
    const container = linksContainerRef.current;
    const index = activeSection ? NAV_ITEMS.findIndex((item) => item.id === activeSection) : -1;
    const target = index >= 0 ? linkRefs.current[index] : null;
    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const nextRect = {
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
      };
      setHighlightRect(nextRect);
      return;
    }
    if (!target) {
      setHighlightRect({ left: 0, width: 0 });
    }
  }, [activeSection]);

  useLayoutEffect(() => {
    updateHighlight();
  }, [updateHighlight]);

  useEffect(() => {
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [updateHighlight]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={() => {
              const target = document.querySelector("#hero") || document.body;
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <div className="p-2 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500">
              <LuZap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-white">CreditX</span>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 relative" ref={linksContainerRef}>
            <motion.div
              className="absolute inset-y-0 my-auto h-9 rounded-full bg-white/10 border border-white/15 backdrop-blur-lg"
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: highlightVisible && highlightRect.width ? 1 : 0,
                x: highlightRect.left,
                width: highlightRect.width,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.6 }}
            />
            {NAV_ITEMS.map((item, index) => {
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeSection === item.id ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 rounded-full"
              onClick={() => window.open('https://github.com/creditx-platform/creditx', '_blank')}
            >
              <LuGithub className="size-4" />
              <span className="hidden sm:inline leading-none">Source</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10 rounded-full"
            >
              <LuMenu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}