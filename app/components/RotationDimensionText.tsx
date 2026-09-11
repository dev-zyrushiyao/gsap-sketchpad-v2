import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef, useState } from "react";

gsap.registerPlugin(useRef, SplitText);

export default function RotationDimensionText() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const split = SplitText.create("h2", { type: "chars" });

      function handleMouseEnter(e: MouseEvent) {
        const target = e.currentTarget;

        // Ignore hovers while the element is actively spinning
        if (gsap.isTweening(target)) return;

        gsap.to(target, {
          rotateY: "+=360",
          duration: 1,
          ease: "back(2)",
        });
      }

      //split chars is array of Element[]
      //convert the Element to HTMLElement
      split.chars.forEach((char) => {
        const element = char as HTMLElement;
        element.addEventListener("mouseenter", handleMouseEnter);
      });

      //div box animation
      const box = container.current?.querySelector(".box");
      if (!box) return;

      const setTransformPerspective = gsap.quickSetter(box, "rotateY");
      setTransformPerspective(250);
      gsap.to(box, { repeat: -1, rotateY: 360, duration: 8 });
    },
    { scope: container },
  );

  return (
    <div className="bg-pink-500 h-125 flex flex-col items-center justify-center gap-6">
      <h3 className="text-white text-5xl text-center">
        This is a animation demo using (transform)perspective and split text
        array injecting a mouseover even on each element
      </h3>

      <div ref={container}>
        <h2 className="text-white text-7xl">Hover me!</h2>

        <div className="box w-80 h-50 bg-amber-300"></div>
      </div>
    </div>
  );
}
