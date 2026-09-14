import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function TweenFromDemo() {
  const container = useRef<HTMLDivElement | null>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { duration: 1 } })

        .addLabel("start")
        .from(container.current, { scale: 0 })

        .to(container.current, { x: 500, scale: 0.5 })
        .addLabel("middle")

        .to(container.current, { rotate: 360, scale: 1 })
        .addLabel("end");
    },
    { scope: container },
  );

  function handleTweenFrom() {
    if (!tl.current) return;
    tl.current.tweenTo("end");
  }

  function handleTweenTo() {
    if (!tl.current) return;
    tl.current.tweenTo("middle", { repeat: 1 });
  }

  function handlefromTo() {
    if (!tl.current) return;
    tl.current.tweenFromTo("end", "start");
  }
  return (
    <div className="w-full h-100 bg-green-200 flex flex-col ">
      <h3 className="text-5xl">TweenFrom and TweenTo Demo</h3>
      <div className="animation-div h-full w-full">
        <div
          ref={container}
          className="box bg-blue-400 h-50 w-50 rounded-xl"
        ></div>
      </div>
      <div className="flex flex-row justify-evenly items-center p-5">
        <button
          className="bg-blue-300 rounded-2xl p-5 text-xl"
          onClick={handleTweenFrom}
        >
          TweenFrom
        </button>
        <button
          className="bg-blue-300 rounded-2xl p-5 text-xl"
          onClick={handleTweenTo}
        >
          TweenTo
        </button>
        <button
          className="bg-blue-300 rounded-2xl p-5 text-xl"
          onClick={handlefromTo}
        >
          TweenFromTo
        </button>
      </div>
    </div>
  );
}
