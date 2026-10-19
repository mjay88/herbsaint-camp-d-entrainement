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
        const el = document.querySelector(`[data-unit-id="${unit.id}"]`);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= headerBottom) {
          currentTitle = unit.title;
        }
        if (top >= headerBottom && unit.id === 1) {
          currentTitle = courseTitle;
        }
      });
      console.log("currentTitle: ", currentTitle);
      setActiveTitle(currentTitle);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [units, courseTitle]);

  return (
    <>
      <div
        ref={headerRef}
        className="sticky top-10 lg:top-5 z-25"
      >
        <Header title={activeTitle} />
      </div>

      <div>{children}</div>
    </>
  );
};
