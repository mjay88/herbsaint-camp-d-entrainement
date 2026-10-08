"use client";

import React, { useEffect, useRef, useState } from "react";
import { Header } from "./header";

type Unit = {
  id: number;
  title: string;
};

type Props = {
  courseTitle: string;
  units: Unit[];
  children: React.ReactNode;
};

export const ScrollingHeader = ({ courseTitle, units, children }: Props) => {
  const [activeTitle, setActiveTitle] = useState(courseTitle);
  const unitRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const headerBottom =
        headerRef.current?.getBoundingClientRect().bottom ?? 0;

      let currentTitle = courseTitle;
      units.forEach((unit) => {
        const el = unitRefs.current.get(unit.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= headerBottom) {
          currentTitle = unit.title;
        }
        if (top >= headerBottom && unit.id === 1) {
          currentTitle = courseTitle;
        }
      });

      setActiveTitle(currentTitle);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [units, courseTitle]);

  return (
    <>
      <div
        ref={headerRef}
        className="sticky top-9 lg:top-0 border-t-white border-t-[20px] border-white rounded-t-xl z-10"
      >
        <Header title={activeTitle} />
      </div>
      {React.Children.map(children, (child, i) => (
        <div
          key={units[i]?.id}
          ref={(el) => {
            if (el && units[i]) unitRefs.current.set(units[i].id, el);
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
};
