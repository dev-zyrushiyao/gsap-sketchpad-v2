import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SlowMo } from "gsap/EasePack";
import React, { useRef } from "react";

const displayText = [
  "Hello",
  "Do you like",
  "animation?",
  "you should learn",
  "GSAP!",
];

gsap.registerPlugin(useGSAP, SlowMo);

gsap.registerEffect({
  name: "scaleToFace",
  extendTimeline: true,
  defaults: {
    duration: 1,
    opacity: 0,
    stagger: 1,
    minScale: 0,
    maxScale: 3,
    easeScale: "slow(0.3, 0.5)",
    easeOpacity: "slow(0.3, 0.5 , true )",
  },
  effect: (
    targets: gsap.DOMTarget,
    config: {
      duration: number;
      opacity: number;
      stagger: number;
      minScale: number;
      maxScale: number;
      easeScale: string;
      easeOpacity: string;
    },
  ) => {
    const tl = gsap
      .timeline()
      .fromTo(
        targets,
        { scale: config.minScale },
        {
          duration: config.duration,
          scale: config.maxScale,
          ease: config.easeScale,
          stagger: config.stagger,
        },
      )
      .from(
        targets,
        {
          opacity: config.opacity,
          duration: config.duration,
          ease: config.easeOpacity,
          stagger: config.stagger,
        },
        "<",
      );

    return tl;
  },
});

export default function InYourFaceText() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const setOpacity = gsap.quickSetter(container.current, "opacity");
      setOpacity(1);

      const masterTl = gsap.timeline({ repeat: -1 });
      const headingElement = container.current?.querySelectorAll("h3");
      if (!headingElement) return;

      masterTl.scaleToFace(headingElement);
    },
    { scope: container },
  );

  return (
    <div className="w-full h-100 bg-blue-200 flex flex-col justify-center items-center relative">
      <div ref={container} className="text-wrapper opacity-0">
        {displayText.map((message) => {
          return (
            <h3
              key={message}
              className="text-5xl font-bold absolute -translate-1/2 origin-center"
            >
              {message}
            </h3>
          );
        })}
      </div>
    </div>
  );
}
