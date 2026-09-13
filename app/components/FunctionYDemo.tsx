import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function FunctionYDemo() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const itemBoxes = container.current?.querySelectorAll(".item-box");
      if (!itemBoxes) return;

      function pickColor(
        index: number,
        target: HTMLElement,
        targets: HTMLElement[],
      ) {
        if (target.textContent === "4") {
          return "pink";
        }

        return "none";
      }

      const pickAxisY = (
        index: number,
        target: HTMLElement,
        targets: HTMLElement[],
      ) => {
        if (target.textContent === "6" || target.textContent === "4") {
          return 0;
        }

        return index * 50;
      };

      gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true }).to(itemBoxes, {
        y: pickAxisY,
        backgroundColor: pickColor,
      });
    },
    { scope: container },
  );

  return (
    <div className="h-150 w-full bg-sky-200">
      <h3 className="text-5xl">Demo of function inside tween of y-axis</h3>
      <div ref={container} className="wrapper flex flex-row">
        {Array.from({ length: 7 }, (_, index) => {
          return (
            <div
              key={index}
              className="item-box w-25 h-25 bg-amber-300 border-2 flex flex-col justify-center items-center"
            >
              {index}
            </div>
          );
        })}
      </div>
    </div>
  );
}
