"use client";

import { colorMySecondary, mdBreakpoint } from "@/lib/constants";
import { useHeaderHeight } from "@/lib/useHeaderHeight";
import { useIsMounted } from "@/lib/useIsMounted";
import { useWindowSize } from "@react-hook/window-size";
import { motion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FindYourFormula } from "./FindYourFormula";
import { TakeTheQuiz } from "./TakeTheQuiz";

export function GrowthVision() {
  const isMounted = useIsMounted();
  const headerHeight = useHeaderHeight();
  const [windowWidth, windowHeight] = useWindowSize();
  const bodyHeight = windowHeight - headerHeight;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${headerHeight}px`, "end end"],
  });

  const [progressStops, setProgressStops] = useState<[number, number]>([0, 1]);
  const progressLength = useTransform(scrollYProgress, progressStops, [0, 1]);
  const lineAnimate = useTransform(progressLength, (progress) => {
    if (!isMounted) return "transparent";
    const stop = progress * 100;
    if (windowWidth >= mdBreakpoint) {
      return `linear-gradient(to right, black 0%, black ${stop}%, transparent ${stop}%)`;
    } else {
      return `linear-gradient(to bottom, black 0%, black ${stop}%, transparent ${stop}%)`;
    }
  });
  const badgeColorRange = ["#EEEEEE", colorMySecondary];
  const descriptionColorRange = ["#A9A9A9", "#3C3C3C"];

  const progressContainerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const growthContainerRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState(0);

  const title1Ref = useRef<HTMLDivElement>(null);
  const description1Ref = useRef<HTMLDivElement>(null);
  const [title1Stops, setTitle1Stops] = useState<[number, number]>([0, 0]);
  const [description1Stops, setDescription1Stops] = useState<[number, number]>([
    0, 0,
  ]);

  const title2Ref = useRef<HTMLDivElement>(null);
  const description2Ref = useRef<HTMLDivElement>(null);
  const [title2Stops, setTitle2Stops] = useState<[number, number]>([0, 0]);
  const [description2Stops, setDescription2Stops] = useState<[number, number]>([
    0, 0,
  ]);

  const title3Ref = useRef<HTMLDivElement>(null);
  const description3Ref = useRef<HTMLDivElement>(null);
  const [title3Stops, setTitle3Stops] = useState<[number, number]>([0, 0]);
  const [description3Stops, setDescription3Stops] = useState<[number, number]>([
    0, 0,
  ]);

  const updateStickyTop = useCallback(() => {
    const growthContainerTop = growthContainerRef.current?.offsetTop || 0;
    const padding =
      (bodyHeight - (growthContainerRef.current?.offsetHeight || 0)) / 2;

    setStickyTop(headerHeight - growthContainerTop + padding);
  }, [headerHeight, bodyHeight]);

  const updateAnimate = useCallback(() => {
    if (
      containerRef.current?.offsetHeight === undefined ||
      growthContainerRef.current?.offsetTop === undefined ||
      stickyContainerRef.current?.offsetHeight === undefined
    )
      return;

    const totalScrollHeight = containerRef.current.offsetHeight - bodyHeight;
    const growthContainerTop = growthContainerRef.current?.offsetTop || 0;
    const padding =
      (bodyHeight - (growthContainerRef.current?.offsetHeight || 0)) / 2;
    const progressStart = (growthContainerTop - padding) / totalScrollHeight;
    const progressEnd =
      progressStart +
      (containerRef.current.offsetHeight -
        stickyContainerRef.current.offsetHeight) /
        totalScrollHeight;
    setProgressStops([progressStart, progressEnd]);

    const getRefStops = (ref: HTMLDivElement): [number, number] => {
      if (windowWidth >= mdBreakpoint) {
        const lineLength = progressContainerRef.current!.offsetWidth;
        const start =
          (ref.getBoundingClientRect().left -
            progressContainerRef.current!.getBoundingClientRect().left) /
          lineLength;
        const end = start + ref.offsetWidth / lineLength;
        return [start, end];
      } else {
        const lineLength = progressContainerRef.current!.offsetHeight;
        const start =
          (ref.getBoundingClientRect().top -
            progressContainerRef.current!.getBoundingClientRect().top) /
          lineLength;
        const end = start + ref.offsetHeight / lineLength;
        return [start, end];
      }
    };

    setTitle1Stops(getRefStops(title1Ref.current!));
    setDescription1Stops(getRefStops(description1Ref.current!));
    setTitle2Stops(getRefStops(title2Ref.current!));
    setDescription2Stops(getRefStops(description2Ref.current!));
    setTitle3Stops(getRefStops(title3Ref.current!));
    setDescription3Stops(getRefStops(description3Ref.current!));
  }, [bodyHeight, windowWidth]);

  useEffect(() => {
    updateStickyTop();
    updateAnimate();

    const resizeObserver = new ResizeObserver(() => {
      updateStickyTop();
      updateAnimate();
    });
    resizeObserver.observe(window.document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateStickyTop, updateAnimate]);

  const title1Animate = useTransform(
    progressLength,
    title1Stops,
    badgeColorRange,
  );
  const description1Animate = useTransform(
    progressLength,
    description1Stops,
    descriptionColorRange,
  );
  const title2Animate = useTransform(
    progressLength,
    title2Stops,
    badgeColorRange,
  );
  const description2Animate = useTransform(
    progressLength,
    description2Stops,
    descriptionColorRange,
  );
  const title3Animate = useTransform(
    progressLength,
    title3Stops,
    badgeColorRange,
  );
  const description3Animate = useTransform(
    progressLength,
    description3Stops,
    descriptionColorRange,
  );

  const progressData = [
    {
      title: "MONTH 1-3",
      description:
        "Visibly fuller, healthier-looking hair. Visibly less shedding. Supported sleep quality.",
      titleRef: title1Ref,
      titleAnimate: title1Animate,
      descriptionRef: description1Ref,
      descriptionAnimate: description1Animate,
    },
    {
      title: "MONTH 4-6",
      description:
        "Visibly thicker hair growth. Faster-growing, longer, and stronger hair.",
      titleRef: title2Ref,
      titleAnimate: title2Animate,
      descriptionRef: description2Ref,
      descriptionAnimate: description2Animate,
    },
    {
      title: "MONTH 7+",
      description:
        "Visibly thicker hair growth. Faster-growing, longer, and stronger hair.",
      titleRef: title3Ref,
      titleAnimate: title3Animate,
      descriptionRef: description3Ref,
      descriptionAnimate: description3Animate,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-base-100 flex flex-col text-base-content/90"
    >
      {/* <motion.div
        className="fixed bottom-0 left-0 w-full h-2 bg-my-secondary z-10"
        style={{
          scaleX: progressLength,
          transformOrigin: "left",
        }}
      /> */}

      <div
        ref={stickyContainerRef}
        className="sticky"
        style={{ top: stickyTop }}
      >
        <FindYourFormula />

        <div
          ref={growthContainerRef}
          className="max-w-[var(--width-max)] mx-auto flex flex-col items-center mt-9 pb-10 md:pb-24 lg:pb-40"
          style={{
            height: !isMounted
              ? "auto"
              : windowWidth >= mdBreakpoint
                ? "auto"
                : `calc(100vh - ${headerHeight}px)`,
          }}
        >
          <h2 className="text-center text-2xl lg:text-3xl mx-auto text-balance max-w-60 md:max-w-full mt-11 lg:mt-28">
            Start growing in as little as 3-6 months
          </h2>

          <div
            ref={progressContainerRef}
            className="relative flex flex-col md:w-full md:flex-row items-center md:items-start justify-between flex-1 mt-6 md:mt-10 lg:mt-18 mb-9 md:px-8 lg:px-12 xl:px-24"
          >
            <div
              className="w-[2px] md:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] xl:w-[calc(100%-192px)] h-full md:h-[2px] mx-auto flex flex-col absolute z-0 bg-[image:var(--dot-line-vertical)] md:bg-[image:var(--dot-line-horizontal)] md:[mask-image:var(--progress-line-mask-horizontal)]"
              style={{
                top:
                  isMounted && windowWidth >= mdBreakpoint
                    ? (title1Ref.current?.offsetHeight || 0) / 2 - 1
                    : 0,
              }}
            >
              <motion.div
                className="w-full h-full bg-my-secondary"
                style={{
                  maskImage: lineAnimate,
                }}
              />
            </div>

            {progressData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center md:w-50 lg:w-70 xl:w-90"
                >
                  <motion.p
                    ref={item.titleRef}
                    style={{
                      backgroundColor: item.titleAnimate,
                    }}
                    className="bg-base-300 text-xs z-1 w-25 h-6 flex items-center justify-center"
                  >
                    {item.title}
                  </motion.p>
                  <motion.div
                    ref={item.descriptionRef}
                    className="bg-base-100 mt-9 z-1 text-sm md:text-xs lg:text-base max-w-75 text-center text-base-content/90"
                    style={{
                      color: item.descriptionAnimate,
                    }}
                  >
                    {item.description}
                  </motion.div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-base-content/40 text-center mt-auto lg:mt-12">
            Based on Women&apos;s Hair Growth Nutraceutical
          </p>
        </div>

        <TakeTheQuiz />
      </div>

      <div className="h-[200vh] bg-pink-400 -z-1"></div>
    </div>
  );
}
