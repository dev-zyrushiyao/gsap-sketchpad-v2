import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { RoughEase } from "gsap/EasePack";
import React, { useRef } from "react";

gsap.registerPlugin(RoughEase, CustomEase);

export default function RoughAndCustomDemo() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const roughEaseTween = gsap.to(".box-rough", {
        x: 5,
        duration: 2,
        ease: "rough({template:none.out,strength: 20,points:80,taper:in,randomize:false,clamp:false})",
        repeat: 1,
        yoyo: true,
      });

      const myCustom = CustomEase.create(
        "custom",
        "M0,0 C0.01,0 -0.007,-0.289 0.011,-0.434 0.012,-0.445 0.103,-0.76 0.158,-0.678 0.204,-0.612 0.219,0 0.268,0 0.318,0 0.3,-0.232 0.35,-0.232 0.399,-0.232 0.399,0.321 0.449,0.321 0.496,0.321 0.481,-0.32 0.524,-0.359 0.526,-0.361 0.546,-0.111 0.549,-0.111 0.6,-0.111 0.581,0.099 0.631,0.099 0.682,0.099 0.699,-0.319 0.749,-0.319 0.799,-0.319 0.781,-0.023 0.831,-0.023 0.881,-0.023 0.899,-0.024 0.949,-0.024 0.974,-0.024 0.974,0 1,0 ",
      );

      const customEaseTween = gsap.to(".box-cust", {
        duration: 2.5,
        ease: myCustom, //or use "custom" as the custom ease reference
        scale: 3,
      });

      const master = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      master.add(roughEaseTween).add(customEaseTween, "<");
    },
    { scope: container },
  );

  return (
    <div className="bg-violet-400-500 w-full h-100">
      <h3 className="text-4xl font-bold">Demo of Rough Ease and Custom Ease</h3>
      <div
        ref={container}
        className="wrapper flex flex-row justify-evenly items-center w-full h-full"
      >
        <div>
          <div className="box-rough bg-pink-200 h-50 w-50 border-2 rounded-2xl"></div>
          <h5 className="text-3xl text-center">Rough Ease</h5>
        </div>
        <div>
          <div className="box-cust bg-yellow-200 h-50 w-50  border-2 rounded-2xl"></div>
          <h5 className="text-3xl text-center">Custom Ease</h5>
        </div>
      </div>
    </div>
  );
}
