"use client";

import pillCanvas from "@/app/assets/pill-canvas.png";
import { xlBreakpoint } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [formulaImageUrl, setFormulaImageUrl] = useState<string | null>(null);
  const [formulaCategory, setFormulaCategory] = useState<FormulaCategory>(
    FormulaCategory["45+ yrs."],
  );
  const [isFormulaChanging, setIsFormulaChanging] = useState(false);
  const pillCanvasRef = useRef<HTMLImageElement>(null);
  const formulaImageRef = useRef<HTMLImageElement>(null);
  const [isFormulaInitialized, setIsFormulaInitialized] = useState(false);

  const dotLine0Ref = useRef<HTMLDivElement>(null);
  const dotLine1Ref = useRef<HTMLDivElement>(null);
  const dotLine2Ref = useRef<HTMLDivElement>(null);
  const dotLine3Ref = useRef<HTMLDivElement>(null);
  const dotLineRefs = [dotLine0Ref, dotLine1Ref, dotLine2Ref, dotLine3Ref];

  const [dotLinePositions, setDotLinePositions] = useState<
    (number | undefined)[]
  >([0, undefined, undefined, undefined]);

  useEffect(() => {
    if (formulaImageUrl) {
      setIsFormulaChanging(true);
      const timer = setTimeout(() => {
        setFormulaImageUrl(formulaImageUrls[formulaCategory]);
        setIsFormulaChanging(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setFormulaImageUrl(formulaImageUrls[formulaCategory]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaCategory]);

  const handleScroll = useCallback(() => {
    if (
      dotLineRefs.some((ref) => !ref.current) ||
      !formulaImageRef.current ||
      isFormulaInitialized
    ) {
      return;
    }

    const dotLine0Top =
      dotLineRefs[0].current!.getClientRects()[0].top + window.scrollY;
    const dotLine2Bottom =
      dotLineRefs[2].current!.getClientRects()[0].bottom + window.scrollY;

    if (window.innerWidth < xlBreakpoint) {
      const position = dotLine0Top + window.scrollY * 3;

      if (position > dotLine2Bottom) {
        formulaImageRef.current!.classList.remove("scale-0");
        formulaImageRef.current!.classList.add("scale-100");
        setIsFormulaInitialized(true);
      }

      const dotLinePositions: (number | undefined)[] = [];
      dotLineRefs.forEach((line, index) => {
        const dotLineBottom =
          line.current!.getClientRects()[0].bottom + window.scrollY;
        const dotLineTop =
          line.current!.getClientRects()[0].top + window.scrollY;

        if (position >= dotLineTop && position < dotLineBottom) {
          dotLinePositions.push(position - dotLineTop);
        } else {
          if (index === 3 && position > dotLineBottom) {
            dotLinePositions.push(dotLineBottom - dotLineTop);
            window.removeEventListener("scroll", handleScroll);
          } else {
            dotLinePositions.push(undefined);
          }
        }
      });
      setDotLinePositions(dotLinePositions);
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dotLine0Ref.current,
    dotLine1Ref.current,
    dotLine2Ref.current,
    dotLine3Ref.current,
    formulaImageRef.current,
  ]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pb-8 flex flex-col bg-linear-to-t from-base-content/12 to-transparent to-50%">
      <p className="mx-auto mt-13 text-sm font-semibold">
        #1 Dermatologist-Recommended
      </p>

      <p className="text-base-content/70 mx-auto mt-1 text-sm">
        Hair Growth Supplement Brand*
      </p>

      <Image
        ref={pillCanvasRef}
        src={pillCanvas}
        alt="Pill Canvas"
        className="mx-auto mt-20 size-56 md:size-86 md:mt-22"
      />

      <DotLine
        ref={dotLine0Ref}
        dotPosition={dotLinePositions[0]}
        className="mx-auto -mt-2 pt-2 w-[10px] h-10"
      />

      <div className="mx-auto text-center font-serif text-4xl md:text-6xl">
        <div className="text-balance relative">
          Hair health is&nbsp; <br />
          <em className="whitespace-nowrap">whole-body</em> health.
        </div>

        <div className="mx-auto mt-5 flex items-center justify-center gap-1 md:mt-8">
          <LinkButton className="w-40 text-sm" href="/products/women">
            Show Women
          </LinkButton>
          <LinkButton className="w-40 text-sm" href="/products/men">
            Show Men
          </LinkButton>
        </div>
      </div>

      <DotLine
        ref={dotLine1Ref}
        dotPosition={dotLinePositions[1]}
        className="mx-auto mt-2 w-[10px] h-16"
      />

      <p className="mx-auto text-center font-serif text-3xl tracking-wide text-balance md:text-4xl">
        Our hair growth <br className="md:hidden" /> formulas{" "}
        <em>
          meet <br className="hidden md:block" /> your body
          <br className="md:hidden" /> where it&apos;s at.
        </em>
      </p>

      <DotLine
        ref={dotLine2Ref}
        dotPosition={dotLinePositions[2]}
        className={cn("mx-auto -z-1 w-[10px] h-20")}
      />

      {formulaImageUrl ? (
        <Image
          ref={formulaImageRef}
          src={formulaImageUrl}
          alt="Formula Image"
          className={cn(
            "mx-auto size-54 transition-all",
            isFormulaInitialized
              ? "scale-100 duration-100"
              : "scale-0 duration-1000",
            isFormulaChanging ? "opacity-0" : "opacity-100",
          )}
          width={500}
          height={500}
        />
      ) : (
        <div className="mx-auto size-54" />
      )}

      <DotLine
        ref={dotLine3Ref}
        dotPosition={dotLinePositions[3]}
        className={cn("mx-auto -z-1 w-[10px] h-10")}
      />

      <div className="mx-auto flex items-center justify-center gap-2">
        <FormulaSelectButton
          onClick={() => {
            setFormulaCategory(FormulaCategory["14-44 yrs."]);
          }}
          isActive={formulaCategory === FormulaCategory["14-44 yrs."]}
        >
          14-44 yrs.
        </FormulaSelectButton>
        <FormulaSelectButton
          onClick={() => {
            setFormulaCategory(FormulaCategory["45+ yrs."]);
          }}
          isActive={formulaCategory === FormulaCategory["45+ yrs."]}
        >
          45+ yrs.
        </FormulaSelectButton>
        <FormulaSelectButton
          onClick={() => {
            setFormulaCategory(FormulaCategory.Postpartum);
          }}
          isActive={formulaCategory === FormulaCategory.Postpartum}
        >
          Postpartum
        </FormulaSelectButton>
      </div>

      <div className="mx-auto mt-6 text-center w-[327px] text-pretty flex flex-col gap-4 text-sm font-thin text-base-content/90 transition-opacity duration-300">
        {formulaParagraphs[formulaCategory]}
      </div>

      <LinkButton className="w-40 text-sm mx-auto mt-6" href="/products/women">
        Shop Now
      </LinkButton>
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
        "bg-white hover:bg-my-secondary-hover rounded px-4 py-2 text-sm font-medium w-28 text-base-content/60",
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
  ref,
  dotSize = 8,
  dotPosition,
}: {
  direction?: "horizontal" | "vertical";
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  dotSize?: number;
  dotPosition?: number;
}) {
  return (
    <div
      className={cn(
        "flex overflow-hidden relative",
        direction === "vertical" ? "px-1" : "py-1",
        className,
      )}
    >
      <div
        ref={ref}
        className={cn(
          "bg-base-content/20 relative after:absolute w-full h-full",
        )}
      >
        {dotPosition !== undefined && (
          <div
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-my-secondary",
              direction === "vertical" ? "top-0 left-1/2" : "top-1/2 left-0",
            )}
            style={{
              width: dotSize,
              height: dotSize,
              top: direction === "vertical" ? dotPosition : undefined,
              left: direction === "vertical" ? undefined : dotPosition,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
