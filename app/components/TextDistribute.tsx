import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

gsap.registerEffect({
  name: "distributedEase",
  extendTimeline: true,
  defaults: {
    ease: "elastic",
    duration: 0.5,
    y: gsap.utils.distribute({
      base: -10,
      amount: 0,
      ease: "back.out",
      from: "center",
    }),
    scale: gsap.utils.distribute({ base: 0.2, amount: 1, from: "center" }),
  },
  effect: (
    targets: gsap.DOMTarget,
    config: { ease: string; duration: number; y: number; scale: number },
  ) => {
    const split = SplitText.create(targets, { type: "chars" });

    const setTransformOrigin = gsap.quickSetter(split.chars, "transformOrigin");
    setTransformOrigin("50% 50%");

    const distTween = gsap.from(split.chars, {
      duration: config.duration,
      repeat: -1,
      repeatDelay: 0.5,
      yoyo: true,
      opacity: 0,
      scale: config.scale,
      ease: config.ease,
      y: config.y,
      stagger: { amount: 0.2, from: "center" },
    });

    return distTween;
  },
});

export default function TextDistribute() {
  const container = useRef(null);

  useGSAP(
    () => {
      const setOpacity = gsap.quickSetter(container.current, "opacity");
      setOpacity(1);

      gsap.effects.distributedEase(container.current, {});
    },
    { scope: container },
  );

  return (
    <div className="bg-orange-400 h-100 w-full flex flex-col justify-center items-center gap-3.5">
      <p className="text-4xl">
        This is a demo of using gsap.utils.distribution()~ yAxis as ease and
        registerEffect()
      </p>
      <h4 ref={container} className="text-7xl opacity-0">
        Distributed Text
      </h4>
    </div>
  );
}
