"use client";

import pillCanvas from "@/app/assets/pill-canvas.png";
import { colorMySecondary, xlBreakpoint } from "@/lib/constants";
import { cn, getComputedPropertyValue } from "@/lib/utils";
import { AnimationScope, useAnimate, useInView } from "motion/react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { LinkButton } from "./LinkButton";

enum FormulaCategory {
  "14-44 yrs." = "14-44 yrs.",
  "45+ yrs." = "45+ yrs.",
  Postpartum = "Postpartum",
}

const formulaImageUrls = {
  "14-44 yrs.":
    "https://images.ctfassets.net/0rbfqd9c4jdo/1YrZ6wwV5Ni6k5UThrSMjo/52d43734035db351bc0d805c48a03c12/hero-women-circle.png",
  "45+ yrs.":
    "https://images.ctfassets.net/0rbfqd9c4jdo/6ttJHOEclNxHtzmqRUQSth/e67a2137fc3d4709977969d2211bc05e/hero-balance-circle.png",
  Postpartum:
    "https://images.ctfassets.net/0rbfqd9c4jdo/7i3uezOZsHhOlsw5CAoTK4/54562c597330eaa8353e5dec65e4961c/hero-pospartum-circle.png",
};

const formulaParagraphs = {
  "14-44 yrs.": [
    <p key="14-44 yrs. 1">
      Stress, imbalanced diets, and not getting enough sleep can impact your
      hair. This award-winning formula is proven to support faster-growing,
      visibly thicker, fuller, stronger hair.<sup>1,2</sup>
    </p>,
    <p key="14-44 yrs. 2">
      The clinically tested ingredients in Nutrafol Women target key root causes
      of thinning that come with leading a busy life.
    </p>,
  ],
  "45+ yrs.": [
    <div key="45+ yrs. 1">
      Nutrafol Women&apos;s Balance is the only hair growth supplement with
      published clinical studies in menopausal women with hair thinning.
      <sup>†</sup>
    </div>,
    <p key="45+ yrs. 2">
      This formula is proven to improve hair growth by targeting key root causes
      of thinning, such as hormones and aging.<sup>3-5</sup>
    </p>,
  ],
  Postpartum: [
    <p key="Postpartum 1">
      Developed by OBGYNs and breastfeeding-friendly, our Postpartum formula
      supports whole-body recovery and targets postpartum hair thinning caused
      by stress, hormonal changes, and nutrient depletion.<sup>6-9</sup>
    </p>,
    <p key="Postpartum 2">Let your hair be one less thing to worry about.</p>,
  ],
};

export function HeroView() {
  return (
    <div className="pb-10 md:pb-12 flex flex-col bg-base-200">
      <p className="mx-auto mt-13 lg:mt-19 xl:mt-20 text-sm font-semibold">
        #1 Dermatologist-Recommended
      </p>
      <p className="text-base-content/70 mx-auto mt-1 text-sm">
        Hair Growth Supplement Brand*
      </p>

      <NarrowLayout />
      <WideLayout />
    </div>
  );
}

function useLayout() {
  const [formulaCategory, setFormulaCategory] = useState<FormulaCategory>(
    FormulaCategory["45+ yrs."],
  );

  const [formulaImageInitialized, setFormulaImageInitialized] = useState(false);
  const [formulaImageAnimationScope, formulaImageAnimate] = useAnimate();
  const [dotLine0DotAnimationScope, dotLine0DotAnimate] = useAnimate();
  const [dotLine0LineAnimationScope, dotLine0LineAnimate] = useAnimate();
  const [dotLine1DotAnimationScope, dotLine1DotAnimate] = useAnimate();
  const [dotLine1LineAnimationScope, dotLine1LineAnimate] = useAnimate();

  useEffect(() => {
    const dotColor = getComputedPropertyValue("--color-my-secondary");

    dotLine0DotAnimate(
      dotLine0DotAnimationScope.current,
      { backgroundColor: dotColor },
      { duration: 0 },
    );
  }, [dotLine0DotAnimate, dotLine0DotAnimationScope]);

  const onFormulaImageInView = useCallback(async () => {
    const dotColor = colorMySecondary;

    if (window.innerWidth < xlBreakpoint) {
      await dotLine0DotAnimate(
        dotLine0DotAnimationScope.current,
        { top: "100%" },
        { duration: 0.5 },
      );
      await new Promise((resolve) => setTimeout(resolve, 400)); // TODO: hotfix, seems like a bug in the animation

      await Promise.all([
        dotLine0DotAnimate(
          dotLine0DotAnimationScope.current,
          { backgroundColor: "transparent" },
          { duration: 0 },
        ),
        formulaImageAnimate(
          formulaImageAnimationScope.current,
          { opacity: 1 },
          { duration: 0 },
        ),
        formulaImageAnimate(
          formulaImageAnimationScope.current,
          { scale: 100 },
          { duration: 0.5 },
        ),
        dotLine1DotAnimate(
          dotLine1DotAnimationScope.current,
          { backgroundColor: dotColor },
          { duration: 0 },
        ),
        dotLine1DotAnimate(
          dotLine1DotAnimationScope.current,
          { top: "100%" },
          { duration: 0.5 },
        ),
      ]);
    } else {
      await dotLine0LineAnimate(
        dotLine0LineAnimationScope.current,
        { height: "100%" },
        { duration: 0.5 },
      );

      await Promise.all([
        dotLine0DotAnimate(
          dotLine0DotAnimationScope.current,
          { backgroundColor: "transparent" },
          { duration: 0 },
        ),
        formulaImageAnimate(
          formulaImageAnimationScope.current,
          { opacity: 1 },
          { duration: 0 },
        ),
        formulaImageAnimate(
          formulaImageAnimationScope.current,
          { scale: 100 },
          { duration: 0.5 },
        ),
        dotLine1DotAnimate(
          dotLine1DotAnimationScope.current,
          { backgroundColor: dotColor },
          { duration: 0 },
        ),
        dotLine1LineAnimate(
          dotLine1LineAnimationScope.current,
          { width: "100%" },
          { duration: 0.5 },
        ),
      ]);
    }

    setFormulaImageInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (formulaCategory && formulaImageInitialized) {
        await formulaImageAnimate(
          formulaImageAnimationScope.current,
          { opacity: 0 },
          { duration: 0.2, ease: "easeInOut" },
        );
        await formulaImageAnimate(
          formulaImageAnimationScope.current,
          { opacity: 1 },
          { duration: 0.2, ease: "easeInOut" },
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaCategory]);

  return {
    formulaCategory,
    formulaImageAnimationScope,
    dotLine0DotAnimationScope,
    dotLine0LineAnimationScope,
    dotLine1DotAnimationScope,
    dotLine1LineAnimationScope,
    onFormulaCategoryChange: setFormulaCategory,
    onFormulaImageInView,
  };
}

function NarrowLayout() {
  const {
    formulaCategory,
    formulaImageAnimationScope,
    dotLine0DotAnimationScope,
    dotLine0LineAnimationScope,
    dotLine1DotAnimationScope,
    dotLine1LineAnimationScope,
    onFormulaCategoryChange,
    onFormulaImageInView,
  } = useLayout();

  return (
    <div className="xl:hidden">
      <PillCanvas className="mx-auto mt-20 md:mt-22 lg:mt-24" />

      <div className="relative pb-47 -mb-27 pt-10 md:pt-20 md:pb-81 md:-mb-43">
        <DotLine
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[calc(100%+8px)] z-1 -mt-2 pt-2"
          dotAnimationScope={dotLine0DotAnimationScope}
          lineAnimationScope={dotLine0LineAnimationScope}
        />
        <Heading1 className="relative mx-auto mt-10 md:mt-20 z-2 pb-2" />
        <Heading2 className="relative mx-auto mt-14 md:mt-32 text-3xl z-2" />
      </div>

      <FormulaImage
        category={formulaCategory}
        className="relative z-2 mx-auto"
        onInView={onFormulaImageInView}
        animationScope={formulaImageAnimationScope}
      />

      <div className="flex w-full -mt-27 h-37 md:-mt-43 md:h-50">
        <DotLine
          className="mx-auto h-full z-1"
          dotAnimationScope={dotLine1DotAnimationScope}
          lineAnimationScope={dotLine1LineAnimationScope}
        />
      </div>

      <FormulaButtonGroup
        className="mx-auto"
        onFormulaCategoryChange={onFormulaCategoryChange}
        formulaCategory={formulaCategory}
      />

      <FormulaParagraphs
        formulaCategory={formulaCategory}
        className="mx-auto mt-6"
      />

      <ShowNowButton className="mx-auto mt-6 md:mt-11" />
    </div>
  );
}

function WideLayout() {
  const {
    formulaCategory,
    formulaImageAnimationScope,
    dotLine0DotAnimationScope,
    dotLine0LineAnimationScope,
    dotLine1DotAnimationScope,
    dotLine1LineAnimationScope,
    onFormulaCategoryChange,
    onFormulaImageInView,
  } = useLayout();

  return (
    <div className="hidden xl:block xl:px-10 2xl:px-28 relative mb-22">
      <div className="flex">
        <div className="flex-1 flex flex-col items-center">
          <PillCanvas className="mt-47" />
          <DotLine
            className="h-137 -mt-2 pt-2"
            dotAnimationScope={dotLine0DotAnimationScope}
            lineAnimationScope={dotLine0LineAnimationScope}
          />
        </div>

        <div className="flex-1">
          <div>
            <Heading1 className="mt-54" />
            <Heading2 className="mt-99" />
            <FormulaParagraphs
              formulaCategory={formulaCategory}
              className="mt-22 xl:w-full xl:pr-48 2xl:pr-50"
            />
            <ShowNowButton className="mt-10" />
          </div>
        </div>
      </div>

      <div className="absolute xl:px-10 2xl:px-28 top-271 left-0 min-h-1 h-0 w-full flex items-center">
        <FormulaImage
          category={formulaCategory}
          className="ml-[calc(25%-180px)]"
          onInView={onFormulaImageInView}
          animationScope={formulaImageAnimationScope}
        />
        <DotLine
          direction="horizontal"
          className="w-full -ml-45"
          dotAnimationScope={dotLine1DotAnimationScope}
          lineAnimationScope={dotLine1LineAnimationScope}
        />
        <FormulaButtonGroup
          formulaCategory={formulaCategory}
          onFormulaCategoryChange={onFormulaCategoryChange}
          className="mr-0"
        />
      </div>
    </div>
  );
}

function FormulaSelectButton({
  children,
  onClick,
  isActive,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button
      className={cn(
        "bg-white border-1 border-base-content/20 hover:bg-my-secondary-hover rounded px-4 py-2 text-sm xl:text-base font-medium w-28 xl:w-[171px] xl:h-14 text-base-content/60",
        isActive && "bg-my-secondary text-base-content",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function DotLine({
  direction = "vertical",
  className,
  dotSize = 8,
  dotAnimationScope,
  lineAnimationScope,
}: {
  direction?: "horizontal" | "vertical";
  className?: string;
  dotSize?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dotAnimationScope?: AnimationScope<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lineAnimationScope?: AnimationScope<any>;
}) {
  return (
    <div
      className={cn(
        "flex overflow-hidden relative",
        direction === "vertical" ? "px-1 w-[10px]" : "py-1 h-[10px]",
        className,
      )}
    >
      <div
        ref={lineAnimationScope}
        className={cn(
          "bg-base-content/20 relative after:absolute w-full h-full",
          direction === "vertical" ? "xl:h-0" : "xl:w-0",
        )}
      >
        <div
          ref={dotAnimationScope}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 rounded-full", // bg-my-secondary",
            direction === "vertical"
              ? "top-0 xl:top-full left-1/2"
              : "top-1/2 left-0 xl:left-full",
          )}
          style={{
            width: dotSize,
            height: dotSize,
            transition:
              direction === "vertical" ? "top 0.5s linear" : "left 0.5s linear",
          }}
        ></div>
      </div>
    </div>
  );
}

function PillCanvas({ className }: { className?: string }) {
  return (
    <Image
      src={pillCanvas}
      alt="Pill Canvas"
      className={cn("size-56 md:size-86 lg:size-90 ", className)}
    />
  );
}

function Heading1({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-center xl:text-left font-serif text-4xl md:text-6xl lg:text-7xl bg-base-200",
        className,
      )}
    >
      <h1 className="relative xl:tracking-tight">
        Hair health is&nbsp; <br />
        <em className="whitespace-nowrap">whole-body</em> health.
      </h1>

      <div className="mt-5 md:mt-12 lg:mt-15 xl:mt-16 flex items-center justify-center xl:justify-start gap-1 md:gap-2">
        <LinkButton className="w-40 xl:w-42 text-sm" href="/products/women">
          Show Women
        </LinkButton>
        <LinkButton className="w-40 xl:w-42 text-sm" href="/products/men">
          Show Men
        </LinkButton>
      </div>
    </div>
  );
}

function Heading2({ className }: { className?: string }) {
  return (
    <h2
      className={cn(
        "text-center xl:text-left font-serif tracking-wide xl:tracking-tight text-balance text-3xl md:text-4xl lg:text-5xl/14 bg-base-200",
        className,
      )}
    >
      Our hair growth <br className="md:hidden lg:block" /> formulas{" "}
      <em>
        meet <br className="hidden md:block lg:hidden" /> your
        <br className="hidden xl:block" /> body
        <br className="md:hidden lg:block xl:hidden" /> where it&apos;s at.
      </em>
    </h2>
  );
}

function FormulaImage({
  category,
  className,
  onInView,
  animationScope,
}: {
  category?: FormulaCategory;
  className: string;
  onInView?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationScope: AnimationScope<any>;
}) {
  const inView = useInView(animationScope, { once: true });

  useEffect(() => {
    if (inView && onInView) {
      onInView();
    }
  }, [inView, onInView]);

  return category ? (
    <Image
      ref={animationScope}
      src={formulaImageUrls[category]}
      alt="Formula Image"
      className={cn(
        "relative z-2 size-54 md:size-86 xl:size-90 scale-1 opacity-0",
        className,
      )}
      width={500}
      height={500}
    />
  ) : (
    <div className={cn("size-54 md:size-86 xl:size-90", className)} />
  );
}

function FormulaButtonGroup({
  className,
  onFormulaCategoryChange,
  formulaCategory,
}: {
  className?: string;
  onFormulaCategoryChange: (formulaCategory: FormulaCategory) => void;
  formulaCategory: FormulaCategory;
}) {
  return (
    <div
      className={cn(
        "flex xl:flex-col items-center justify-center gap-2 transition-transform duration-300",
        {
          "xl:translate-y-16":
            formulaCategory === FormulaCategory["14-44 yrs."],
          "xl:-translate-y-16": formulaCategory === FormulaCategory.Postpartum,
        },
        className,
      )}
    >
      <FormulaSelectButton
        onClick={() => {
          onFormulaCategoryChange(FormulaCategory["14-44 yrs."]);
        }}
        isActive={formulaCategory === FormulaCategory["14-44 yrs."]}
      >
        14-44 yrs.
      </FormulaSelectButton>
      <FormulaSelectButton
        onClick={() => {
          onFormulaCategoryChange(FormulaCategory["45+ yrs."]);
        }}
        isActive={formulaCategory === FormulaCategory["45+ yrs."]}
      >
        45+ yrs.
      </FormulaSelectButton>
      <FormulaSelectButton
        onClick={() => {
          onFormulaCategoryChange(FormulaCategory.Postpartum);
        }}
        isActive={formulaCategory === FormulaCategory.Postpartum}
      >
        Postpartum
      </FormulaSelectButton>
    </div>
  );
}

function FormulaParagraphs({
  formulaCategory,
  className,
}: {
  formulaCategory: FormulaCategory;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-center xl:text-left w-[327px] md:w-[500px] text-pretty flex flex-col gap-4 text-sm md:text-base lg:text-lg xl:text-[22px] font-thin text-base-content/90 transition-opacity duration-300",
        className,
      )}
    >
      {formulaParagraphs[formulaCategory]}
    </div>
  );
}

function ShowNowButton({ className }: { className?: string }) {
  return (
    <LinkButton
      className={cn("w-40 text-sm", className)}
      href="/products/women"
    >
      Show Now
    </LinkButton>
  );
}
