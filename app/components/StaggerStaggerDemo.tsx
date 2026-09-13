import { useGSAP } from "@gsap/react";
import { create } from "domain";
import gsap from "gsap";
import React, { useRef } from "react";
import { text } from "stream/consumers";

gsap.registerPlugin(useGSAP);

const displayMessage: string[] = [
  "Golden crunchy crust",
  "Baked fresh every morning",
  "12 savory & sweet flavors",
  "Zero palm oil",
  "100% real dairy butter",
];

export default function StaggerStaggerDemo() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      function createDivElem(displayMessage: string[]) {
        displayMessage.forEach((message) => {
          const newDiv = document.createElement("div");
          newDiv.textContent = message;
          newDiv.className =
            "text-slideshow absolute text-5xl font-bold inline-block";
          container.current?.appendChild(newDiv);
        });
      }
      createDivElem(displayMessage);

      //from and to doesn't have a opacity 1 because when its created its default by opacity 1
      const textSlideShow =
        container.current?.querySelectorAll(".text-slideshow");

      if (!textSlideShow) return;

      const pause = 0.5;
      const duration = 0.5;
      const stagger = duration + pause;
      const numberOfTargets = textSlideShow.length;
      const repeatDelay = stagger * (numberOfTargets - 1) + pause;

      const tl = gsap
        .timeline({})
        .from(textSlideShow, {
          duration: duration,
          y: 50,
          opacity: 0,
          stagger: {
            each: stagger,
            repeat: -1,
            repeatDelay: repeatDelay,
          },
        })
        .to(
          textSlideShow,
          {
            duration: duration,
            y: -50,
            opacity: 0,
            stagger: { each: stagger, repeat: -1, repeatDelay: repeatDelay },
          },
          stagger,
        );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="bg-blue-300 w-full h-100 flex flex-col justify-center items-center"
    ></div>
  );
}
