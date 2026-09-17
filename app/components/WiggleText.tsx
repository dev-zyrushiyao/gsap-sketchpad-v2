import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, GSDevTools);

gsap.registerEffect({
  name: "wiggleText",
  extendTimeline: true,
  defaults: {
    y: 100,
    ease: "elastic(1, 0.35)",
    stagger: 0.03,
    opacity: 0,
    durationEase: 1,
    durationOpacity: 0.3,
  },
  effect: (
    targets: gsap.DOMTarget,
    config: {
      y: number;
      ease: string;
      stagger: number;
      opacity: number;
      durationEase: number;
      durationOpacity: number;
    },
  ) => {
    const tl = gsap
      .timeline()
      .from(targets, {
        duration: config.durationEase,
        y: config.y,
        ease: config.ease,
        stagger: config.stagger,
      })
      .from(
        targets,
        {
          duration: config.durationOpacity,
          opacity: config.opacity,
          stagger: config.stagger,
        },
        "<",
      );

    return tl;
  },
});

export default function WiggleText() {
  const container = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const splitHeader = SplitText.create("h3", { type: "chars" });
      const splitPara = SplitText.create("p", { type: "words" });
      //   const splitContainer = SplitText.create(container.current, {
      //     type: "chars words",
      //   });

      const setOpacity = gsap.quickSetter(container.current, "opacity");
      setOpacity(1);

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.wiggleText(splitHeader.chars).wiggleText(
        splitPara.words,
        {
          durationEase: 2,
        },
        "-=0.90",
      );

      //   tl.wiggleText(splitContainer.chars);

      console.log("duration of timeline", tl.duration());
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="bg-gray-400 w-full h-100 flex flex-col justify-center items-center opacity-0"
    >
      <h3 className="text-5xl font-bold font-sans ">
        Animation is all about creativity!
      </h3>
      <p className="text-2xl">Lets learn GSAP Animation together!</p>
      <p className="text-2xl">
        Wiggle effect is brought to you by elastic ease
      </p>
    </div>
  );
}
