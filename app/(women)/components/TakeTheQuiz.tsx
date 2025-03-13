import { cn } from "@/lib/utils";
import {
  motion,
  useAnimate,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LinkButton } from "./LinkButton";

const curveGroups = [
  {
    name: "AGING",
    height: 50,
  },
  {
    name: "STRESS",
    height: 90,
  },
  {
    name: "NUTRITION",
    height: 50,
  },
  {
    name: "LIFESTYLE",
    height: 90,
  },
  {
    name: "HORMONES",
    height: 80,
  },
  {
    name: "METABOLISM",
    height: 60,
  },
];

export function TakeTheQuiz() {
  const [currentCurveGroup, setCurrentCurveGroup] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "start start"],
  });
  const progressLength = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const imgInnerBorderShadow = useTransform(progressLength, (progress) => {
    return `inset 0 0 ${progress * 100}px 0px var(--color-teal-950)`;
  });
  const imgBlur = useTransform(progressLength, (progress) => {
    return `blur(${progress * 24}px)`;
  });
  const curveGroupOpacity = useTransform(progressLength, [0.4, 0.6], [0, 1]);
  const isInView = useInView(containerRef);

  const visiableCurveGroups = useMemo<typeof curveGroups>(() => {
    const prevPrev =
      (currentCurveGroup - 2 + curveGroups.length) % curveGroups.length;
    const prev =
      (currentCurveGroup - 1 + curveGroups.length) % curveGroups.length;
    const next = (currentCurveGroup + 1) % curveGroups.length;
    const nextNext = (currentCurveGroup + 2) % curveGroups.length;
    return [
      curveGroups[prevPrev],
      curveGroups[prev],
      curveGroups[currentCurveGroup],
      curveGroups[next],
      curveGroups[nextNext],
    ];
  }, [currentCurveGroup]);
  const [curveGroupRef, curveGroupAnimate] = useAnimate();

  const nextCurveGroup = useCallback(() => {
    if (!isInView) return;

    setCurrentCurveGroup((prev) => {
      const curveGroupEls =
        curveGroupRef.current?.querySelectorAll(".curve-group");
      const rulerContainerEl =
        curveGroupRef.current?.querySelector(".ruler-container");

      const groupHeight = curveGroupEls[2].getBoundingClientRect().height;
      const scale = groupHeight / 101;
      const offset =
        rulerContainerEl?.getBoundingClientRect().bottom -
        curveGroupEls[2].getBoundingClientRect().bottom;

      const next = (prev + 1) % curveGroups.length;
      curveGroupAnimate(
        ".peek-point",
        {
          bottom: (curveGroups[next].height + 1) * scale + offset,
        },
        {
          duration: 1,
        },
      );

      const groupNameEl = curveGroupRef.current?.querySelector(".group-name");
      if (groupNameEl) {
        groupNameEl.textContent = curveGroups[next].name;
        curveGroupAnimate(
          groupNameEl,
          {
            opacity: [0, 0, 1],
          },
          {
            duration: 1,
            times: [0.0, 0.9, 1],
          },
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      curveGroupEls.forEach(async (el: any, index: number) => {
        await curveGroupAnimate(
          el,
          {
            translateX: `${-250 + 100 * index}%`,
          },
          {
            duration: 1,
          },
        );
        curveGroupAnimate(
          el,
          {
            scaleY: index === 3 ? 1 : 0.95,
          },
          {
            duration: 1,
          },
        );
      });
      return next;
    });
  }, [curveGroupAnimate, curveGroupRef, isInView]);

  useEffect(() => {
    const interval = setInterval(nextCurveGroup, 3000);

    return () => clearInterval(interval);
  }, [nextCurveGroup]);

  useEffect(() => {
    if (isInView) {
      nextCurveGroup();
    }
  }, [isInView, nextCurveGroup]);

  return (
    <div
      ref={containerRef}
      className="max-w-[var(--width-max)] mx-auto aspect-square md:aspect-[4/3] lg:aspect-[15/6] xl:aspect-[16/5]"
    >
      {/* <motion.div
        className="fixed bottom-0 left-0 w-full h-2 bg-my-secondary z-10"
        style={{
          scaleX: progressLength,
          transformOrigin: "left",
        }}
      /> */}

      <div className="w-full h-full relative rounded overflow-hidden bg-gradient-to-b lg:bg-gradient-to-l from-transparent via-teal-950 via-55% lg:via-50% to-teal-950 flex flex-col lg:flex-row items-center text-center mt-10">
        <motion.div className="flex flex-1 w-full lg:w-1/2 lg:h-full items-center overflow-hidden relative lg:order-2">
          <motion.div
            className="absolute inset-0 pointer-events-none z-1"
            style={{
              boxShadow: imgInnerBorderShadow,
            }}
          />
          <motion.img
            src="https://images.ctfassets.net/0rbfqd9c4jdo/6EAPzpOqjcxPYWy5WqLENn/bc376639e4ebb021382670396d2f3ba3/quiz-banner-bg.jpg?fl=progressive"
            alt="Quiz Banner"
            width={1920}
            height={1080}
            className="w-full h-full object-cover absolute top-0 left-0 -z-1"
            style={{
              filter: imgBlur,
            }}
          />

          <motion.div
            ref={curveGroupRef}
            className="relative h-full w-full flex z-2 mt-15 lg:mt-35 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]"
            style={{ opacity: curveGroupOpacity }}
          >
            <div className="relative flex flex-row items-start w-full h-full">
              {visiableCurveGroups.map((group, index) => (
                <motion.div
                  key={group.name}
                  className="curve-group absolute top-0 left-0 min-w-1/2 w-1/2 aspect-square md:aspect-[4/3] lg:aspect-square xl:aspect-[5/4] object-fill origin-bottom"
                  style={{
                    scaleY: index === 2 ? 1 : 0.95,
                    translateX: `${-150 + 100 * index}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                >
                  <CurveGroup
                    height={group.height}
                    className="w-full h-full object-fill"
                  />
                </motion.div>
              ))}
            </div>

            <div className="ruler-container absolute top-0 left-0 w-full h-[calc(100%-40px)] lg:h-[calc(100%-120px)] flex justify-center">
              <div className="w-[2px] h-full bg-[image:repeating-linear-gradient(to_bottom,gray_0%,gray_3px,transparent_3px,transparent_14px)]" />
              <div
                className="peek-point absolute left-1/2 -translate-x-1/2 translate-y-1/2 h-[6px] w-[6px] rounded-full bg-my-secondary flex items-center justify-center"
                style={{
                  bottom: 0,
                }}
              >
                <p className="group-name text-xs text-base-100 -mt-8">
                  GROUPNAME
                </p>
              </div>
              <div className="absolute bottom-[0px] left-1/2 -translate-x-1/2 translate-y-1/2 h-[6px] w-[6px] rounded-full bg-my-secondary" />
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col md:flex-row lg:flex-col items-center lg:items-start w-full lg:w-1/2 md:justify-between mt-10 md:px-10 lg:px-18">
          <p className="text-base-100 text-xl md:text-left md:text-2xl lg:text-3xl w-90 md:w-110">
            Not sure where to start? Uncover what you need to support hair
            growth.
          </p>
          <LinkButton
            href="/quiz"
            className="my-8 md:my-14 lg:my-8 text-sm lg:text-base lg:h-13"
            showIcon
          >
            Take the Quiz
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

function CurveGroup({
  className,
  height,
}: {
  className?: string;
  height: number;
}) {
  return (
    <svg
      className={cn("w-full h-full", className)}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d={`M 0 100 C 25 100, 25 ${100 - height}, 50 ${100 - height} C 75 ${100 - height}, 75 100, 100 100`}
        fill="none"
        stroke="hsl(0, 0%, 70%)"
        strokeWidth="0.5"
      />
      <path
        d={`M 0 100 C 25 100, 25 ${110 - height}, 50 ${110 - height} C 75 ${110 - height}, 75 100, 100 100`}
        fill="none"
        stroke="hsl(0, 0%, 60%)"
        strokeWidth="0.5"
      />
      <path
        d={`M 0 100 C 25 100, 25 ${120 - height}, 50 ${120 - height} C 75 ${120 - height}, 75 100, 100 100`}
        fill="none"
        stroke="hsl(0, 0%, 50%)"
        strokeWidth="0.5"
      />
      <path
        d={`M 0 100 C 25 100, 25 ${130 - height}, 50 ${130 - height} C 75 ${130 - height}, 75 100, 100 100`}
        fill="none"
        stroke="hsl(0, 0%, 40%)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
