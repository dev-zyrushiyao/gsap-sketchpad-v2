import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import React, { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, Draggable, MotionPathPlugin);

export default function TimelineVisualizer() {
  //use ref
  const container = useRef(null);
  const animationTl = useRef<gsap.core.Timeline>(null);

  //state
  const [timeState, setTimeState] = useState<number>(0);

  //child distance from #indicator-seconds
  //this is constant , update this value according to the SVG made in Figma
  const pixelPerSecond: number = 210;

  const { contextSafe } = useGSAP(
    () => {
      //timeline
      animationTl.current = gsap.timeline({
        onUpdate: function () {
          const timeVal = this.time().toFixed(2);
          setTimeState(Number(timeVal));
        },
      });
      animationTl.current
        .to("#shape-star", { x: 950, duration: 1 })
        .to("#shape-ellipse", { x: 950, duration: 1 })
        .to("#shape-box", { x: 950, duration: 1 });

      //item Children
      const childArrId: string[] = [];
      const itemChildren = document.querySelectorAll("#items > *");
      itemChildren.forEach((child) => {
        const targetId = child.getAttribute("id");
        //add the id to the children
        if (targetId) {
          childArrId.push(targetId);
        }
      });

      //animation children
      const animChildren = animationTl.current.getChildren();

      //reference the childArrId as selector and use animChildren[i] for values
      for (let i = 0; i < animChildren.length; i++) {
        //set the time location of the box in the UI
        gsap.set("#" + childArrId[i], {
          x: animChildren[i].startTime() * pixelPerSecond,
        });

        //set the length of the width according to the animation duration
        gsap.set(`#${childArrId[i]} > rect`, {
          width: animChildren[i].duration() * pixelPerSecond,
        });

        console.log(childArrId[i]);
      }

      //drag scrub
      const dragObject = document.querySelector("#drag-scrub");
      const tlFrame = document.querySelector("#timeline-ui-frame");
      Draggable.create(dragObject, {
        type: "x",
        bounds: tlFrame,
        edgeResistance: 0,
        onDrag: function () {
          if (!animationTl.current) return;

          //fixed calculation
          const duration = animationTl.current?.duration();
          const targetTime = Math.max(
            0,
            Math.min(duration, this.x / pixelPerSecond),
          );

          //animation timeline behavior when dragged
          if (!animationTl.current) return;
          animationTl.current.pause();
          animationTl.current.progress(targetTime / duration);

          const time = animationTl.current.time().toFixed(2);
          setTimeState(Number(time));
        },
      });
    },
    { scope: container },
  );

  function handleClickRewind(): void {
    const context = contextSafe(() => {
      if (!animationTl.current) return;

      const duration = animationTl.current.duration();
      if (duration === 0) return;

      //calculate rewind without changing the timeline
      const targetTime = Math.max(0, animationTl.current.time() - 0.5);
      //animation behavior
      const currentProgress = targetTime / duration;
      animationTl.current.pause();

      //tween the rewind
      gsap.to(animationTl.current, {
        progress: currentProgress,
        duration: 0.5,
      });
    });

    context();
  }

  function handleClickPlay(): void {
    const context = contextSafe(() => {
      if (!animationTl.current) return;

      const currentTimeScale = animationTl.current?.timeScale();
      if (currentTimeScale === 0) {
        gsap.to(animationTl.current, { timeScale: 1, duration: 0.3 });
      }

      animationTl.current.play();
    });

    context();
  }

  function handleClickStop() {
    const context = contextSafe(() => {
      if (!animationTl.current) return;
      gsap.to(animationTl.current, { timeScale: 0 });
      console.log("STOP");

      const time = animationTl.current.time();
      const prog = animationTl.current.progress();

      console.log("time", time);
      console.log("prog", prog);
    });

    context();
  }

  return (
    <div ref={container}>
      <svg
        // width={1060}
        // height={505}
        viewBox="0 0 1060 505"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Frame 1596" clipPath="url(#clip0_3709_9880)">
          <rect width={1060} height={505} fill="#282828" />
          <g id="tween-g">
            <path
              id="shape-star"
              d="M65.5 11L71.1129 28.2746H89.2764L74.5818 38.9508L80.1946 56.2254L65.5 45.5491L50.8054 56.2254L56.4182 38.9508L41.7236 28.2746H59.8871L65.5 11Z"
              fill="#DB7272"
            />
            <circle
              id="shape-ellipse"
              cx={65.5}
              cy={104}
              r={25}
              fill="#576BEB"
            />
            <rect
              id="shape-box"
              x={40.5}
              y={147}
              width={50}
              height={50}
              fill="#42CE3A"
            />
          </g>
          <rect
            id="timeline-ui-frame"
            y={325}
            width={1060}
            height={104}
            fill="#747474"
          />
          <g id="items">
            <g id="timeline-item-3">
              <rect
                width={208}
                height={30}
                transform="translate(0 325)"
                fill="#D9D9D9"
              />
              <g id="label">
                <path
                  id="label-icon"
                  d="M76.5 330L78.7451 336.91H86.0106L80.1327 341.18L82.3779 348.09L76.5 343.82L70.6221 348.09L72.8673 341.18L66.9894 336.91H74.2549L76.5 330Z"
                  fill="#DB7272"
                />
                <text
                  id="label-caption"
                  fill="black"
                  style={{
                    whiteSpace: "pre",
                  }}
                  xmlSpace="preserve"
                  fontFamily="Inter"
                  fontSize={12}
                  letterSpacing="0em"
                >
                  <tspan x={98.5} y={344.364}>
                    {"TWEEN"}
                  </tspan>
                </text>
              </g>
            </g>
            <g id="timeline-item-2">
              <rect
                width={208}
                height={30}
                transform="translate(0 362)"
                fill="#D9D9D9"
              />
              <g id="label_2">
                <circle
                  id="label-icon_2"
                  cx={76.5}
                  cy={377}
                  r={10}
                  fill="#576BEB"
                />
                <text
                  id="label-caption_2"
                  fill="black"
                  style={{
                    whiteSpace: "pre",
                  }}
                  xmlSpace="preserve"
                  fontFamily="Inter"
                  fontSize={12}
                  letterSpacing="0em"
                >
                  <tspan x={98.5} y={381.364}>
                    {"TWEEN"}
                  </tspan>
                </text>
              </g>
            </g>
            <g id="timeline-item-1">
              <rect
                width={208}
                height={30}
                transform="translate(0 399)"
                fill="#D9D9D9"
              />
              <g id="label_3">
                <rect
                  id="label-icon_3"
                  x={66.5}
                  y={404}
                  width={20}
                  height={20}
                  fill="#42CE3A"
                />
                <text
                  id="label-caption_3"
                  fill="black"
                  style={{
                    whiteSpace: "pre",
                  }}
                  xmlSpace="preserve"
                  fontFamily="Inter"
                  fontSize={12}
                  letterSpacing="0em"
                >
                  <tspan x={98.5} y={418.364}>
                    {"TWEEN"}
                  </tspan>
                </text>
              </g>
            </g>
          </g>
          <g id="control">
            <g id="rewind-btn" onClick={handleClickRewind}>
              <title>Rewind 0.5s</title>
              <path
                id="Polygon"
                d="M443 463.5L473 446.179V480.821L443 463.5Z"
                fill="#D9D9D9"
              />
            </g>
            <g id="stop-btn" onClick={handleClickStop}>
              <title>Stop</title>
              <circle
                id="Ellipse 51"
                cx={530.5}
                cy={463.5}
                r={24.5}
                fill="#D9D9D9"
              />
              <g id="Group 125">
                <line
                  id="Line 52"
                  x1={526.5}
                  y1={450.5}
                  x2={526.5}
                  y2={475.5}
                  stroke="#6D6262"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
                <line
                  id="Line 53"
                  x1={534.5}
                  y1={450.5}
                  x2={534.5}
                  y2={475.5}
                  stroke="#6D6262"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              </g>
            </g>
            <g id="play-btn" onClick={handleClickPlay}>
              <title>Play</title>
              <path
                id="Polygon_2"
                d="M618 463.5L588 480.821V446.179L618 463.5Z"
                fill="#D9D9D9"
              />
            </g>
          </g>
          <path
            id="drag-scrub"
            d="M34 278C41.1797 278 47 283.82 47 291V298C47 305.18 41.1797 311 34 311H6C4.03389 311 2.17062 310.562 0.5 309.78V427C0.5 428.381 -0.619288 429.5 -2 429.5C-3.38071 429.5 -4.5 428.381 -4.5 427V306H-4.24316C-5.96874 303.794 -7 301.018 -7 298V291C-7 283.82 -1.1797 278 6 278H34Z"
            fill="#AF6363"
          />
          <g id="indicator-seconds">
            <text
              fill="white"
              style={{
                whiteSpace: "pre",
              }}
              xmlSpace="preserve"
              fontFamily="Inter"
              fontSize={12}
              letterSpacing="0em"
            >
              <tspan x={1.25} y={298.864}>
                {"0"}
              </tspan>
            </text>
            <text
              fill="white"
              style={{
                whiteSpace: "pre",
              }}
              xmlSpace="preserve"
              fontFamily="Inter"
              fontSize={12}
              letterSpacing="0em"
            >
              <tspan x={212.211} y={298.864}>
                {"1"}
              </tspan>
            </text>
            <text
              fill="white"
              style={{
                whiteSpace: "pre",
              }}
              xmlSpace="preserve"
              fontFamily="Inter"
              fontSize={12}
              letterSpacing="0em"
            >
              <tspan x={421.367} y={298.864}>
                {"2"}
              </tspan>
            </text>
            <text
              fill="white"
              style={{
                whiteSpace: "pre",
              }}
              xmlSpace="preserve"
              fontFamily="Inter"
              fontSize={12}
              letterSpacing="0em"
            >
              <tspan x={631.18} y={298.864}>
                {"3"}
              </tspan>
            </text>
            <text
              fill="white"
              style={{
                whiteSpace: "pre",
              }}
              xmlSpace="preserve"
              fontFamily="Inter"
              fontSize={12}
              letterSpacing="0em"
            >
              <tspan x={841.15} y={298.864}>
                {"4"}
              </tspan>
            </text>
            <text
              fill="white"
              style={{
                whiteSpace: "pre",
              }}
              xmlSpace="preserve"
              fontFamily="Inter"
              fontSize={12}
              letterSpacing="0em"
            >
              <tspan x={1051.35} y={298.864}>
                {"5"}
              </tspan>
            </text>
          </g>
          <g id="time-stamp">
            <text
              id="Time:"
              fill="white"
              style={{
                whiteSpace: "pre",
              }}
              xmlSpace="preserve"
              fontFamily="Inter"
              fontSize={12}
              letterSpacing="0em"
            >
              <tspan x={859} y={471.864}>
                {"Time:"}
              </tspan>
            </text>
            <text
              fill="white"
              style={{
                whiteSpace: "pre",
              }}
              xmlSpace="preserve"
              fontFamily="Inter"
              fontSize={12}
              letterSpacing="0em"
            >
              <tspan x={900} y={471.864}>
                {timeState}
              </tspan>
            </text>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3709_9880">
            <rect width={1060} height={505} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
