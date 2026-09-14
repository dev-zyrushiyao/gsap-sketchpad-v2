import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import SplitText from "gsap/src/SplitText";
import React, { useRef } from "react";

const displayMessage: string[] = [
  "GSAP",
  "REACT",
  "Animation",
  "CSS",
  "Frontend",
];

gsap.registerPlugin(SplitText, GSDevTools);

export default function SplitCharStagger() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const setOpacity = gsap.quickSetter(container.current, "opacity");
      setOpacity(1);

      const tl = gsap.timeline({ repeat: -1 });

      //from and to doesn't have a opacity 1 because when its created its default by opacity 1
      const textSlideShow =
        container.current?.querySelectorAll(".text-slideshow");
      if (!textSlideShow) return;

      textSlideShow.forEach((text, index) => {
        const split = SplitText.create(text, { type: "chars" });

        tl.from(split.chars, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          stagger: { amount: 0.3 },
        }).to(split.chars, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          stagger: { amount: 0.3 },
        });
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="bg-blue-300 w-full h-100 flex flex-col justify-center items-center opacity-0"
    >
      {displayMessage.map((message: string, index: number) => {
        return (
          <div
            key={index}
            className="text-slideshow absolute text-5xl font-bold inline-block"
          >
            {message}
          </div>
        );
      })}
    </div>
  );
}
