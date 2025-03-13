"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  MotionValue,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { GrLinkNext } from "react-icons/gr";

const COUNTER_DURATION = 2;

export function ClinicalTesting() {
  const counterRef = useRef<HTMLDivElement>(null);
  const overallImprovementCount = useMotionValue(0);
  const sheddingReductionCount = useMotionValue(0);
  const studiesCount = useMotionValue(0);
  const overallImprovementCountRounded = useTransform(() =>
    Math.round(overallImprovementCount.get()),
  );
  const sheddingReductionCountRounded = useTransform(() =>
    Math.round(sheddingReductionCount.get()),
  );
  const studiesCountRounded = useTransform(() =>
    Math.round(studiesCount.get()),
  );
  const isInView = useInView(counterRef);

  useEffect(() => {
    console.log("isInView", isInView);
    if (isInView) {
      const overallImprovementCtrl = animate(overallImprovementCount, 90, {
        duration: COUNTER_DURATION,
      });
      const sheddingReductionCtrl = animate(sheddingReductionCount, 84, {
        duration: COUNTER_DURATION,
      });
      const studiesCtrl = animate(studiesCount, 20, {
        duration: COUNTER_DURATION,
      });

      return () => {
        overallImprovementCtrl.stop();
        sheddingReductionCtrl.stop();
        studiesCtrl.stop();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div className="max-w-[var(--width-max)] mx-auto bg-base-100 pt-4 md:pt-6 lg:pt-16">
      <section className="bg-teal-950 text-base-300 px-6 md:px-8 lg:px-12 xl:px-28 pt-8 md:pt-10 lg:pt-14 xl:pt-18 pb-10 md:pb-12 lg:pb-16 xl:pb-20">
        <h2 className="text-[28px] md:text-[34px] lg:text-[46px] xl:text-[48px] font-serif">
          Clinical testing isn&apos;t optional -<br /> it&apos;s our standard.
        </h2>

        <div className="md:flex">
          <div className="flex flex-col md:w-1/2 lg:w-3/5">
            <div className="flex items-center gap-2 text-sm mt-5">
              <div className="bg-my-secondary text-teal-950 p-1 rounded-xs">
                <GrLinkNext />
              </div>
              <span className="mt-[2px]">Explore Our Clinical Trials</span>
            </div>
            <p className="font-bold lg:text-lg xl:text-xl mt-20 md:mt-auto md:mr-17">
              Hair health innovations you can trust, thanks to industry-leading
              hair measurement.
            </p>
          </div>

          <div
            ref={counterRef}
            className="pt-6 flex flex-col md:w-1/2 lg:w-2/5"
          >
            <div className="w-full h-[6px] rounded-t border-t border-x border-base-100/40"></div>

            <div className="px-2">
              <CounterItem counter={overallImprovementCountRounded} unit="%">
                of women saw overall improvement in their hair after 6 months.
                <sup>2</sup>
              </CounterItem>

              <CounterItem counter={sheddingReductionCountRounded} unit="%">
                of women saw less shedding after 6 months.<sup>2</sup>
              </CounterItem>

              <CounterItem counter={studiesCountRounded} className="border-b-0">
                clinical studies, including randomized, placebo-controlled
                trials.
                <sup>10</sup>
              </CounterItem>
            </div>

            <div className="w-full h-[6px] rounded-b border-b border-x border-base-100/40"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CounterItem({
  className,
  counter,
  unit,
  children,
}: {
  className?: string;
  counter: MotionValue<number>;
  unit?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center py-4 border-b border-base-100/40",
        className,
      )}
    >
      <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif inline-block min-w-25 md:min-w-30 lg:min-w-45 xl:min-w-50">
        <motion.pre className="inline-block font-serif">{counter}</motion.pre>
        {unit}
      </span>
      <span>{children}</span>
    </div>
  );
}
