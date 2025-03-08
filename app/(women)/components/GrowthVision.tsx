"use client";

import { colorMySecondary } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function GrowthVision() {
  const headerHeight = 93;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", `end ${headerHeight}px`],
  });
  const progressLength = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const lineAnimate = useTransform(progressLength, (progress) => {
    const stop = progress * 100;
    return `linear-gradient(to bottom, black 0%, black ${stop}%, transparent ${stop}%)`;
  });
  const badgeColorRange = ["#EEEEEE", colorMySecondary];
  const descriptionColorRange = ["#A9A9A9", "#3C3C3C"];

  const badge1Ref = useRef<HTMLDivElement>(null);
  const description1Ref = useRef<HTMLDivElement>(null);
  const [badge1Stops, setBadge1Stops] = useState<[number, number]>([0, 0]);
  const [description1Stops, setDescription1Stops] = useState<[number, number]>([
    0, 0,
  ]);

  const badge2Ref = useRef<HTMLDivElement>(null);
  const description2Ref = useRef<HTMLDivElement>(null);
  const [badge2Stops, setBadge2Stops] = useState<[number, number]>([0, 0]);
  const [description2Stops, setDescription2Stops] = useState<[number, number]>([
    0, 0,
  ]);

  const badge3Ref = useRef<HTMLDivElement>(null);
  const description3Ref = useRef<HTMLDivElement>(null);
  const [badge3Stops, setBadge3Stops] = useState<[number, number]>([0, 0]);
  const [description3Stops, setDescription3Stops] = useState<[number, number]>([
    0, 0,
  ]);
  const timeBadgeClasses =
    "bg-base-300 text-xs z-1 w-25 h-6 flex items-center justify-center";
  const descriptionClasses =
    "bg-base-100 mt-9 z-1 text-sm max-w-75 text-center text-base-content/90";

  useEffect(() => {
    if (
      !badge1Ref.current ||
      !description1Ref.current ||
      !badge2Ref.current ||
      !description2Ref.current ||
      !badge3Ref.current ||
      !description3Ref.current
    )
      return;

    const totaline1Length =
      badge3Ref.current.offsetTop +
      badge3Ref.current.offsetHeight -
      badge1Ref.current.offsetTop;

    const getRefStops = (ref: HTMLDivElement): [number, number] => {
      const stopStart =
        (ref.offsetTop - badge1Ref.current!.offsetTop) / totaline1Length;
      const stopEnd = stopStart + ref.offsetHeight / totaline1Length;
      return [stopStart, stopEnd];
    };

    setBadge1Stops(getRefStops(badge1Ref.current!));
    setDescription1Stops(getRefStops(description1Ref.current!));
    setBadge2Stops(getRefStops(badge2Ref.current!));
    setDescription2Stops(getRefStops(description2Ref.current!));
    setBadge3Stops(getRefStops(badge3Ref.current!));
    setDescription3Stops(getRefStops(description3Ref.current!));
  }, [badge1Ref.current?.offsetTop, badge3Ref.current?.offsetTop]);

  const badge1Animate = useTransform(
    progressLength,
    badge1Stops,
    badgeColorRange,
  );
  const description1Animate = useTransform(
    progressLength,
    description1Stops,
    descriptionColorRange,
  );
  const badge2Animate = useTransform(
    progressLength,
    badge2Stops,
    badgeColorRange,
  );
  const description2Animate = useTransform(
    progressLength,
    description2Stops,
    descriptionColorRange,
  );
  const badge3Animate = useTransform(
    progressLength,
    badge3Stops,
    badgeColorRange,
  );
  const description3Animate = useTransform(
    progressLength,
    description3Stops,
    descriptionColorRange,
  );

  return (
    <div className="bg-base-100 pt-20 flex flex-col text-base-content/90">
      <motion.div
        className="fixed top-50 left-0 w-full h-2 bg-my-secondary z-10"
        style={{
          scaleX: progressLength,
          transformOrigin: "left",
        }}
      />

      <div
        ref={scrollContainerRef}
        className="mx-auto flex flex-col items-center"
      >
        <h2 className="text-center text-2xl mx-auto text-balance max-w-60 mb-6">
          Start growing in as little as 3-6 months
        </h2>

        <div className="relative flex flex-col items-center">
          <ProgressLine lineAnimate={lineAnimate} />

          <motion.p
            ref={badge1Ref}
            style={{
              backgroundColor: badge1Animate,
            }}
            className={cn(timeBadgeClasses)}
          >
            MONTH 1-3
          </motion.p>
          <motion.div
            ref={description1Ref}
            className={cn(descriptionClasses)}
            style={{
              color: description1Animate,
            }}
          >
            Visibly fuller, healthier-looking hair. Visibly less shedding.
            Supported sleep quality.
          </motion.div>

          <motion.p
            ref={badge2Ref}
            className={cn(timeBadgeClasses, "mt-48")}
            style={{
              backgroundColor: badge2Animate,
            }}
          >
            MONTH 4-6
          </motion.p>
          <motion.div
            ref={description2Ref}
            className={cn(descriptionClasses)}
            style={{
              color: description2Animate,
            }}
          >
            Visibly thicker hair growth. Faster-growing, longer, and stronger
            hair.
          </motion.div>

          <motion.p
            ref={badge3Ref}
            className={cn(timeBadgeClasses, "mt-48")}
            style={{
              backgroundColor: badge3Animate,
            }}
          >
            MONTH 7+
          </motion.p>
        </div>

        <div className="relative flex flex-col items-center">
          {/* <ProgressLine lineAnimate={"0"} /> */}

          <motion.div
            ref={description3Ref}
            className={cn(descriptionClasses)}
            style={{
              color: description3Animate,
            }}
          >
            Visibly thicker hair growth. Faster-growing, longer, and stronger
            hair.
          </motion.div>
        </div>
      </div>

      <p className="text-xs text-base-content/40 text-center mt-8">
        Based on Women&apos;s Hair Growth Nutraceutical
      </p>
    </div>
  );
}

function ProgressLine({
  lineAnimate,
  className,
}: {
  lineAnimate: MotionValue<string>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[2px] h-full mx-auto flex flex-col absolute z-0 bg-[image:var(--dot-line-vertical)]",
        className,
      )}
    >
      <motion.div
        className="w-full h-full bg-my-secondary"
        style={{
          maskImage: lineAnimate,
        }}
      />
    </div>
  );
}
