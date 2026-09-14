import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function LinearNavigationTimeline() {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  //state
  const [circleElem, setCircleElem] = useState<number>(0);

  useGSAP(
    () => {
      const setOpacity = gsap.quickSetter(container.current, "opacity");
      setOpacity(1);

      tl.current = gsap.timeline({ paused: true, defaults: { duration: 1 } });

      tl.current.addLabel("b-1");
      tl.current.from(".box-1", { scale: 0, duration: 0.7, ease: "bounce" });
      tl.current.addPause();
      tl.current.to(".box-1", { rotate: -90, opacity: 0, scale: 0 });

      tl.current.addLabel("b-2");
      tl.current.from(".box-2", { opacity: 0 });
      tl.current.addPause();
      tl.current.to(".box-2", { opacity: 0 });

      tl.current.addLabel("b-3");
      tl.current.from(".box-3", {
        duration: 1,
        opacity: 0,
        rotateX: -360,
        ease: "back(2)",
      });
      tl.current.addPause();
      tl.current.to(".box-3", { scaleY: 0, scaleX: 0, ease: "bounce.in" });

      tl.current.addLabel("b-4");
      tl.current.from(".box-4", { opacity: 0, scale: 2 });
      tl.current.addPause();
      tl.current.to(".box-4", { x: 200, scale: 0 });

      //set the circle button according to the label
      const labels = tl.current.labels;
      const labelsLength = Object.keys(labels).length;
      setCircleElem(labelsLength);

      //helper function provided by Greensock - via snorkl.tv lesson
      //did not use on this lesson
      const getLabelsArray = (timeline: gsap.core.Timeline) =>
        Object.keys(timeline.labels)
          .map((v) => ({ name: v, time: timeline.labels[v] }))
          .sort((a, b) => a.time - b.time);

      getLabelsArray(tl.current);
    },
    { scope: container },
  );

  function handleClickPlayNext(): void {
    tl.current?.play();
  }

  function handleClickPrev(): void {
    tl.current?.reverse();
  }

  function handleClickPlayLabel(e: React.MouseEvent) {
    const label = e.currentTarget.getAttribute("data-label");

    if (!tl.current) return;
    tl.current.play(label);

    console.log("label", label);
  }

  return (
    <div>
      <div ref={container} className="w-full h-50 bg-gray-500 opacity-0">
        <h3 className="text-4xl"> Demo of timeline().addPause() and labels</h3>
        <div className="wrapper flex flex-row justify-evenly items-center  perspective-origin-center">
          <div className="box-1 w-30 h-30 bg-blue-200 rounded-xl flex flex-col justify-center items-center">
            1
          </div>
          <div className="box-2 w-30 h-30 bg-blue-200 rounded-xl flex flex-col justify-center items-center">
            2
          </div>
          <div className="box-3 w-30 h-30 bg-blue-200 rounded-xl flex flex-col justify-center items-center">
            3
          </div>
          <div className="box-4 w-30 h-30 bg-blue-200 rounded-xl flex flex-col justify-center items-center">
            4
          </div>
        </div>
      </div>
      <div className="nav h-25 w-full bg-gray-400 ">
        <div className="circle-nav flex flex-row justify-evenly">
          {Array.from({ length: circleElem }).map((_, index) => {
            const dataLabel = `b-${index + 1}`;
            const title = `label-b-${index + 1}`;
            return (
              <div
                key={index}
                title={title}
                data-label={dataLabel}
                className={`w-10 h-10 rounded-3xl bg-red-400 border-4 border-yellow-300  cursor-pointer`}
                onClick={handleClickPlayLabel}
              ></div>
            );
          })}
        </div>
        <div className="flex flex-row justify-center items-center gap-5">
          <button
            className="btn-prev bg-amber-300 rounded-2xl w-25 h-15 border-2 font-bold"
            onClick={handleClickPrev}
          >
            Prev
          </button>
          <button
            className="btn-prev bg-amber-300 rounded-2xl w-25 h-15 border-2 font-bold"
            onClick={handleClickPlayNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
