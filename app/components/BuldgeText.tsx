import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, GSDevTools);
export default function BuldgeText() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create("h3", { type: "chars" });

      const setOpacity = gsap.quickSetter(container.current, "opacity");
      setOpacity(1);
      const setColor = gsap.quickSetter(split.chars, "color");
      setColor("#36BBA7");
      const setTransformPerspective = gsap.quickSetter(
        split.chars,
        "perspective",
      );
      setTransformPerspective("180");

      const tl = gsap
        .timeline()
        .to(split.chars, {
          duration: 0.3,
          scaleX: 1.3,
          stagger: 0.05,
          z: 80,
          rotateY: 35,
          ease: "none",
          color: "#C8EFE9",
        })
        .to(
          split.chars,
          {
            duration: 0.3,
            stagger: 0.05,
            scaleX: 0,
            z: 0,
            rotateY: 0,
            ease: "none",
            color: "#36BBA7",
          },
          "0.3",
        );

      GSDevTools.create({ animation: tl });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="bg-gray-500 h-100 w-full flex flex-col justify-center items-center opacity-0"
    >
      <h3 className="text-6xl font-bold  ">HELLO! LETS LEARN GSAP TOGETHER</h3>
    </div>
  );
}
