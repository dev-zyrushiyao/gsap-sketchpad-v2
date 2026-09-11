import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

type Coordinates = { x: number; y: number; distX: number };
type QuickSetterFn = (value: number | string) => void;

export default function MouseDemo() {
  //useRef
  const container = useRef<HTMLDivElement | null>(null);

  //state
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0,
    distX: 0,
  });

  //useGsap - contextSafe
  const { contextSafe } = useGSAP(() => {}, { scope: container });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>): void {
    const context = contextSafe(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      const xAxis = e.nativeEvent.clientX - rect.left;
      const yAxis = e.nativeEvent.clientY - rect.top;

      //calculates the distance between the width and the center of the div
      const center = rect.width / 2;
      const distanceX = Math.abs(center - xAxis);

      const updatedCoordinates: Coordinates = {
        x: xAxis,
        y: yAxis,
        distX: distanceX,
      };
      setCoordinates(updatedCoordinates);

      //quickSetter
      const setScaleX = gsap.quickSetter(".box", "scaleX");
      const setScaleY = gsap.quickSetter(".box", "scaleY");

      const scaleX = gsap.utils.mapRange(0, center, 2, 0.0, distanceX);
      // const scaleY = gsap.utils.mapRange(0, 500, 1, 1.5, yAxis);

      setScaleX(scaleX);
      setScaleY(scaleX);
    });

    context();
  }

  return (
    <div className="flex flex-row justify-center items-center gap-3.5 ">
      <div
        ref={container}
        onMouseMove={handleMouseMove}
        className="border-5 border-black h-[500px] w-[500px] flex flex-row justify-center items-center relative"
      >
        {/* <div className="border h-full w-0.1"></div> */}
        <div className="box border-2 rounded-2xl bg-amber-200 w-50 h-50 "></div>
      </div>
      <div className="bg-amber-300 w-30">
        <p>mouse-X: {coordinates.x}</p>
        <p>mouse-Y: {coordinates.y}</p>
        <p>distance-X: {coordinates.distX}</p>
      </div>
    </div>
  );
}
