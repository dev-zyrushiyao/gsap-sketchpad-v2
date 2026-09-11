import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(SplitText);

gsap.registerEffect({
  name: "zipper",
  extendTimeline: true,
  defaults: {
    yWrap: [100, -100],
    duration: 0.5,
  },
  effect: (
    targets: gsap.DOMTarget,
    config: { yWrap: number[]; duration: number },
  ) => {
    const wrapRotate = gsap.utils.wrap([90, -90]);

    const split = SplitText.create(targets, {
      type: "chars",
    });

    const tween = gsap.from(split.chars, {
      opacity: 0,

      y: gsap.utils.wrap(config.yWrap),
      duration: config.duration,
      rotate: wrapRotate,
      stagger: { each: 0.05, from: "start" },
    });

    return tween;
  },
});

export default function WrapText() {
  const container = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      // Tween
      // gsap.effects.zipper("h1", { y: 100 });

      //--or

      //Timeline chaining via registerEffect({extendedTimeline: bool})
      const tl = gsap
        .timeline({ repeat: -1, repeatDelay: 1 })
        .zipper("h1")
        .zipper("p", { duration: 1 });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="bg-blue-700 h-96 flex flex-col items-center justify-center"
    >
      <h1 className="text-cyan-200 text-7xl text-center">
        This is registerPluginDemo , gsap.utils.wrap() and <br />{" "}
        gsap.registerEffect
      </h1>

      <p className="text-cyan-100 text-4xl">Have a great day!</p>
    </div>
  );
}
