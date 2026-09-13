import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

type QuickSetterFn = (value: string | number) => void;

export default function MouseDemo() {
  //useRef
  const container = useRef<HTMLDivElement | null>(null);
  const setContainerOverFlow = useRef<QuickSetterFn | null>(null);
  const setScrollX = useRef<QuickSetterFn | null>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);

  //useGsap - contextSafe
  const { contextSafe } = useGSAP(
    () => {
      //boxWrapper rect
      const boxWrapper = container.current?.querySelector(
        ".box-wrapper",
      ) as HTMLElement;
      const boxWrapperRect = boxWrapper.getBoundingClientRect();
      const boxWrapperWidth = boxWrapperRect.width;

      //container rect
      const containerRect = container.current?.getBoundingClientRect();
      if (!containerRect) return;
      const containerWidth = containerRect.width;
      const containerCenter = containerWidth / 2;

      //scroll computation
      const scrollAmount = boxWrapperWidth - containerWidth;

      const updateSquash = () => {
        //calculate the distance of the boxtiles to the container
        const boxTiles =
          container.current?.querySelectorAll("[class*=box-tile-]");
        //convert node to array
        const boxTilesArr = Array.from(boxTiles ?? []);

        //array of quickSetter
        const setScaleXList = boxTilesArr.map((tile) =>
          gsap.quickSetter(tile, "scaleX"),
        );

        boxTilesArr.forEach((tile, index) => {
          const tileRect = tile.getBoundingClientRect();
          const distanceTile = tileRect.left - containerRect?.left;

          const rawScale = gsap.utils.mapRange(120, 0, 1, 0.1, distanceTile);
          const scaleX = gsap.utils.clamp(0.1, 1, rawScale);

          setScaleXList[index](scaleX);
        });
      };

      //unmount the ticker at the bottom of useGSAP
      gsap.ticker.add(updateSquash);

      //tween
      //it is default to (negative)scrollAmount to make the animation go left to right
      //the animation scroll switch to right when the cursor is on the right side of the container.current
      // left focus cursor gives negative value (cursor distance to the center of container.ref)
      // right focus gives positive value (cusor distance to the center of container.ref)
      // negative value of distance gives negavite timeScale -> this is going to rewind the animation of tween.X
      // positive value of distance gives positive timeScale -> this is going to play forward the animation of tween.X
      // bigger negative value / positive value will show a slower and faster animation
      // mouse distance trigger is handled by handleMouseMove function
      setContainerOverFlow.current = gsap.quickSetter(
        container.current,
        "overflow",
      ) as QuickSetterFn;
      setScrollX.current = gsap.quickSetter(boxWrapper, "x") as QuickSetterFn;

      setContainerOverFlow.current("hidden");
      setScrollX.current(containerCenter);

      //tween
      scrollTween.current = gsap.to(boxWrapper, {
        x: -scrollAmount,
        duration: 10,
        ease: "none",
      });

      const handleMouseMove = (e: MouseEvent, center: number): void => {
        //distance of center to left and right side of the container.current
        const distanceX = e.offsetX - containerCenter;
        console.log("distance", distanceX);
        const setTimeScale = gsap.utils.mapRange(
          -center,
          center,
          -3,
          3,
          distanceX,
        );

        if (!scrollTween.current) return;
        scrollTween.current.timeScale(setTimeScale);
      };

      //injects the listener to the container.current
      container.current?.addEventListener("mousemove", (e: MouseEvent) => {
        handleMouseMove(e, containerCenter);
      });

      return () => {
        gsap.ticker.remove(updateSquash);
      };
    },
    { scope: container },
  );

  return (
    <div className="flex flex-row justify-center items-start">
      <div
        ref={container}
        className="border-5 border-black h-[500px] w-[500px] flex flex-row items-center"
      >
        <div className="box-wrapper flex flex-row gap-3">
          {Array.from({ length: 10 }, (_, index) => {
            return (
              <div
                key={index}
                className={`box-tile-${index + 1} bg-blue-300 rounded-2xl flex flex-col justify-center items-center w-30 h-30 `}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-amber-300 w-50">
        {/* <p>mouse-X: {coordinates.x}</p>
        <p>mouse-Y: {coordinates.y}</p>
        <p>distance-X: {coordinates.distX}</p>
        <p>rotation: {coordinates.rotation}</p> */}
      </div>
    </div>
  );
}
