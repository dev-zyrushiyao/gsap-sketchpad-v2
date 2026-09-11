"use client";

import MouseDemo from "./components/MouseDemo";
import RotationDimensionText from "./components/RotationDimensionText";
import SchoolTravel from "./components/SchoolTravel";
import TimelineVisualizer from "./components/TimelineVisualizer";
import WrapText from "./components/WrapText";

export default function Home() {
  return (
    <div>
      <SchoolTravel />
      <TimelineVisualizer />
      <WrapText />
      <RotationDimensionText />
      <MouseDemo />
    </div>
  );
}
