"use client";

import BoxStaggerStagger from "./components/BoxStaggerStagger";
import FunctionYDemo from "./components/FunctionYDemo";
import LinearNavigationTimeline from "./components/LinearNavigationTimeline";
import MouseDemo from "./components/MouseDemo";
import RotationDimensionText from "./components/RotationDimensionText";
import RubberText from "./components/RubberText";
import SchoolTravel from "./components/SchoolTravel";
import SplitCharStagger from "./components/SplitCharStagger";

import StaggerStaggerDemo from "./components/StaggerStaggerDemo";
import TextDistribute from "./components/TextDistribute";
import TimelineVisualizer from "./components/TimelineVisualizer";
import TweenFromDemo from "./components/TweenFromDemo";
import WrapText from "./components/WrapText";

export default function Home() {
  return (
    <div>
      <SchoolTravel />
      <TimelineVisualizer />
      <FunctionYDemo />
      <WrapText />
      <RotationDimensionText />
      <MouseDemo />
      <RubberText />
      <TextDistribute />
      <StaggerStaggerDemo />
      <BoxStaggerStagger />
      <SplitCharStagger />
      <LinearNavigationTimeline />
      <TweenFromDemo />
    </div>
  );
}
