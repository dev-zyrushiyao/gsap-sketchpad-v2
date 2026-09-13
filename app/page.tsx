"use client";

import MouseDemo from "./components/MouseDemo";
import RotationDimensionText from "./components/RotationDimensionText";
import RubberText from "./components/RubberText";
import SchoolTravel from "./components/SchoolTravel";
import StaggerStaggerDemo from "./components/StaggerStaggerDemo";
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
      <RubberText />
      <StaggerStaggerDemo />
    </div>
  );
}
