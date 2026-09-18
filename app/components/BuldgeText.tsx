import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, GSDevTools);

gsap.registerEffect({
  name: "buldgeShine",
  extendTimeline: true,
  defaults: {
    color: "#1F3D1F",
    shineColor: "#39AD39",
    transformPerspective: 180,
    stagger: 0.25,
    rotationY: 35,
    duration: 1,
    z: 90,
  },
  effect: (
    targets: gsap.DOMTarget,
    config: {
      color: string;
      shineColor: string;
      transformPerspective: number;
      stagger: number;
      rotationY: number;
      duration: number;
      z: number;
    },
  ) => {
    const setColor = gsap.quickSetter(targets, "color");
    setColor(config.color);
    const setTransformPerspective = gsap.quickSetter(
      targets,
      "transformPerspective",
      "px",
    );
    setTransformPerspective(config.transformPerspective);

    const tl = gsap
      .timeline()
      .to(targets, {
        z: config.z,
        color: config.shineColor,
        duration: config.duration,
        stagger: { each: config.stagger, repeat: 1, yoyo: true },
      })
      .to(
        targets,
        {
          duration: config.duration / 2,
          rotateY: config.rotationY,
          stagger: { each: config.stagger, repeat: 1, yoyo: true },
        },
        "<",
      )
      .to(
        targets,
        {
          duration: config.duration / 2,
          rotateY: -config.rotationY,

          stagger: { each: config.stagger, repeat: 1, yoyo: true },
        },
        config.duration,
      );

    return tl;
  },
});
export default function BuldgeText() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create("h3", { type: "chars" });

      const setOpacity = gsap.quickSetter(container.current, "opacity");
      setOpacity(1);

      const tl = gsap
        .timeline()
        .buldgeShine(split.chars, { duration: 0.5, stagger: 0.1 });

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
