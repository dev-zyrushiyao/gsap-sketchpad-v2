import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

const titleDisplay: string[] = [
  "Hi! my name is Zyrus",
  "I am a creative frontend developer",
  "I love music and games",
  "I love react,",
  "typescript,",
  "and......",
  "GSAP!",
];

gsap.registerPlugin(SplitText);

gsap.registerEffect({
  name: "slideInFade",
  extendTimeline: true,
  defaults: {
    x: 0,
    y: 0,
    opacity: 1,
    stagger: 0.013,
    duration: 1,
    ease: "power1.inOut",
  },
  effect: (
    target: gsap.DOMTarget,
    config: {
      x: number;
      y: number;
      opacity: number;
      stagger: number;
      duration: number;
      ease: string;
    },
  ) => {
    const tl = gsap
      .timeline()
      .from(target, {
        x: config.x,
        y: config.y,
        duration: 0.5,

        ease: config.ease,
        stagger: { each: config.stagger },
      })
      .from(
        target,
        {
          duration: config.duration,
          opacity: config.opacity,
          ease: config.ease,
        },
        "<",
      );

    return tl;
  },
});

gsap.registerEffect({
  name: "slideOutFade",
  extendTimeline: true,
  defaults: {
    x: 0,
    y: 0,
    opacity: 1,
    stagger: 0.013,
    duration: 0.5,
    ease: "power1.inOut",
  },
  effect: (
    target: gsap.DOMTarget,
    config: {
      x: number;
      y: number;
      opacity: number;
      stagger: number;
      duration: number;
      ease: string;
    },
  ) => {
    const tl = gsap
      .timeline()
      .from(target, { duration: 1.5 })
      .to(target, {
        x: config.x,
        y: config.y,

        duration: config.duration,
        opacity: config.opacity,
        ease: config.ease,
        stagger: { each: config.stagger },
      });

    return tl;
  },
});

gsap.registerEffect({
  name: "randomFade",
  extendTimeline: true,
  defaults: {
    x: 0,
    y: 0,
    opacity: 0,
    stagger: 1,
    duration: 0.5,
    ease: "none",
  },
  effect: (
    target: gsap.DOMTarget,
    config: {
      x: number;
      y: number;
      opacity: number;
      stagger: number;
      duration: number;
      ease: string;
    },
  ) => {
    const tl = gsap
      .timeline()
      .from(target, {
        duration: config.duration,
        opacity: config.opacity,
        stagger: { amount: config.stagger, ease: config.ease, from: "random" },
      })
      .to(
        target,
        {
          duration: config.duration,
          opacity: config.opacity,
          stagger: {
            amount: config.stagger,
            ease: config.ease,
            from: "random",
          },
        },
        "+=0.5",
      );

    return tl;
  },
});

export default function TitleEffectsGen() {
  const container = useRef<HTMLDivElement | null>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const setOpacity = gsap.quickSetter("ul", "opacity");
      setOpacity(1);

      masterTl.current = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    },
    { scope: container },
  );

  function playSlideAnimation(): void {
    const listElem = container.current?.querySelectorAll("li");
    if (!listElem) return;

    masterTl.current?.clear();

    listElem?.forEach((elem) => {
      const split = SplitText.create(elem, { type: "chars words" });
      if (!masterTl.current) return;
      masterTl.current
        .slideInFade(split.chars, { y: 300, ease: "back" })
        .slideOutFade(split.chars, { y: 500, ease: "back.in" });
    });
  }

  function playRandomFadeAnimation(): void {
    const listElem = container.current?.querySelectorAll("li");
    if (!listElem) return;

    masterTl.current?.clear();

    listElem?.forEach((elem) => {
      const split = SplitText.create(elem, { type: "chars words" });
      if (!masterTl.current) return;
      masterTl.current.randomFade(split.words);
    });
  }

  return (
    <div className="bg-violet-200 w-full h-100 relative overflow-hidden">
      <div className="flex flex-row gap-5 items-center">
        <h3 className="text-3xl">Demo of chaining registeredEffects</h3>
        <button
          className="bg-orange-300 rounded-2xl p-7"
          onClick={playSlideAnimation}
        >
          Slide in/out
        </button>
        <button
          className="bg-orange-300 rounded-2xl p-7"
          onClick={playRandomFadeAnimation}
        >
          Random fade
        </button>
      </div>

      <div
        ref={container}
        className="flex flex-col justify-center items-center h-full "
      >
        <ul className="opacity-0 bg-amber-300   ">
          {titleDisplay.map((title) => {
            return (
              <li
                key={title}
                className="text-4xl text-center absolute -translate-1/2 font-semibold  "
              >
                {title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
