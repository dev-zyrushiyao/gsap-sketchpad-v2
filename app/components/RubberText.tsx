import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export default function RubberText() {
  const container = useRef(null);

  useGSAP(
    () => {
      const setOpacity = gsap.quickSetter(container.current, "opacity");
      setOpacity(1);

      const split = SplitText.create(container.current, { type: "chars" });

      const scaleDist = gsap.utils.distribute({
        base: 0.2,
        amount: 1.3,
        from: "center",
      });

      const xDist = gsap.utils.distribute({ base: -200, amount: 400 });

      gsap.from(split.chars, {
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true,
        opacity: 0,
        scale: scaleDist,
        x: xDist,
        stagger: { amount: 0.2, from: "center" },
      });
    },
    { scope: container },
  );

  return (
    <div className="bg-gray-400 h-100 w-full flex flex-col justify-center items-center gap-3.5">
      <p className="text-4xl">
        This is a demo of using gsap.utils.distribution()
      </p>
      <h4 ref={container} className="text-7xl opacity-0">
        RUBBERBAND
      </h4>
    </div>
  );
}
