"use client";

import { mdBreakpoint } from "@/lib/constants";
import { useIsMounted } from "@/lib/useIsMounted";
import { cn } from "@/lib/utils";
import { useWindowWidth } from "@react-hook/window-size";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useMotionValue, useTime, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const SUCCESS_EXAMPLES = [
  {
    id: 0,
    icon: "https://images.ctfassets.net/0rbfqd9c4jdo/A4njNCDnjUHxTcYVsKP4m/4347044f1afcdcdb5a9238ba6b8be3ab/lydia-tn.png?fl=progressive",
    imageBefore:
      "https://images.ctfassets.net/0rbfqd9c4jdo/6NDf4pZPpeBNjmYHofj6Ik/08a7c88e229bf97eb6d12aef9b4ebde1/lydia-before.jpg?fl=progressive",
    imageAfter:
      "https://images.ctfassets.net/0rbfqd9c4jdo/5kGKS7yY2hRGEDY0uvSapI/a66c467f51ae9300a5242290a0ccc829/lydia-after.jpg?fl=progressive",
    comment:
      "“I was experiencing a lot of breakage and I’m not seeing that anymore when I comb my hair.”",
    name: "Lydia",
    labels: [
      "Stronger Hair Growth",
      "Visibly Less Shedding",
      "Visibly Shinier",
    ],
  },
  {
    id: 1,
    icon: "https://images.ctfassets.net/0rbfqd9c4jdo/4VmLt6HiUM2YM5dZv7ZDDC/7db2deb9e90665ad63a65c2e1bb3e428/lilyana-tn.png?fl=progressive",
    imageBefore:
      "https://images.ctfassets.net/0rbfqd9c4jdo/1xRlzfxyiGtul5keYo7la2/62227ee790d40c2d95694dd8e731ffa9/lilyana-before.jpg?fl=progressive",
    imageAfter:
      "https://images.ctfassets.net/0rbfqd9c4jdo/3bTG65ZRBM16CYRaryFd1m/ed117c9db2b2c7c1b6fc153996f21279/lilyana-after.jpg?fl=progressive",
    comment:
      "“I have noticed my hair looks thicker, my curl patterns have come back, my eyebrows look a lot thicker, and my hair length is a lot longer than it was before.”",
    name: "Lilyana",
    labels: [
      "Visibly Less Shedding",
      "Fuller Hairline",
      "Baby Hairs Growing Out",
    ],
  },
  {
    id: 2,
    icon: "https://images.ctfassets.net/0rbfqd9c4jdo/5y6AMNMrNOo1l0DFEFrJ9W/1af241ab24e542962fccf558e7b2d65e/brian-tn.png?fl=progressive",
    imageBefore:
      "https://images.ctfassets.net/0rbfqd9c4jdo/3FFJ9USkrbbbYlBYMmuik5/9c02ca3d0ab73c5ed0ab2a188dce4b10/brian-before.jpg?fl=progressive",
    imageAfter:
      "https://images.ctfassets.net/0rbfqd9c4jdo/4KYb93oX0pzujuGyK5YGNG/2906ee3c7ff35e6f693a9e3734778438/brian-after.jpg?fl=progressive",
    comment:
      "“I’m definitely noticing more hair in the front, where I was thinning, as well as on the top of my head.”",
    name: "Brian",
    labels: ["Visibly Fuller", "Scalp Coverage", "Hair Growth"],
  },
  {
    id: 3,
    icon: "https://images.ctfassets.net/0rbfqd9c4jdo/3aiQpUBjJukntnudsG0VpZ/a8c500f531011eccff24e4af787a6c79/candace-tn.png?fl=progressive",
    imageBefore:
      "https://images.ctfassets.net/0rbfqd9c4jdo/3T8QdZ9HE95NKkQPOLCyRp/a44be307b024efca832e99c76050b3c0/candace-before.jpg?fl=progressive",
    imageAfter:
      "https://images.ctfassets.net/0rbfqd9c4jdo/225pQdIsMuhCtX039rQthx/2a73cbc85b0a4e1bc450893efbc1290e/candace-after.jpg?fl=progressive",
    comment:
      "“I have been taking Nutrafol Postpartum for 3 months and I noticed some great changes. My hair has gotten visibly thicker and stronger. It has been a good journey so far.”",
    name: "Candace",
    labels: [
      "Visibly Thicker Hair Volume",
      "Visibly Fuller",
      "Visibly Less Shedding",
    ],
  },
  {
    id: 4,
    icon: "https://images.ctfassets.net/0rbfqd9c4jdo/2WTKsYFX2oIQuigRHdTE0u/19c02ff3e2c9983ef6b6613a347af829/lindsey-tn.png?fl=progressive",
    imageBefore:
      "https://images.ctfassets.net/0rbfqd9c4jdo/2QG8p21XfodvJSiBGxSZ0d/bf86c9082597a3f898fc7c09820f21d5/lindsey-before.jpg?fl=progressive",
    imageAfter:
      "https://images.ctfassets.net/0rbfqd9c4jdo/4luHMezjNtdGfCmghCjtwI/c90003dd93826a99ebeccb77b13824c5/lindsey-after.jpg?fl=progressive",
    comment:
      "“It not only helped with the thickness and fullness of my hair, but also the strength and durability. People compliment me left and right about how healthy and strong my hair looks.”",
    name: "Lindsey",
    labels: [
      "Visibly Less Shedding",
      "Visibly Thicker Hair Volume",
      "Hair Growth",
    ],
  },
  {
    id: 5,
    icon: "https://images.ctfassets.net/0rbfqd9c4jdo/7aMyR6usRwz0A7kzKz4YMK/d82d55676eceec8c3b7a44f83c996ae3/mark-tn.png?fl=progressive",
    imageBefore:
      "https://images.ctfassets.net/0rbfqd9c4jdo/6TOcwnB4NnjPHj0sluC4Nx/e0a78d11b96ba5540af5a86d2141c840/mark-before.jpg?fl=progressive",
    imageAfter:
      "https://images.ctfassets.net/0rbfqd9c4jdo/3ScIEjgHreCdZXpLRrIIp8/6e5fe1e11da07f2663eb2879fd05769d/mark-after.jpg?fl=progressive",
    comment:
      "“I was concerned as I was thinning on top. I tried the supplement and saw remarkable improvement. I gained more confidence in myself.”",
    name: "Mark",
    labels: ["Hair Growth", "Stronger Feeling", "Visibly Thicker"],
  },
  {
    id: 6,
    icon: "https://images.ctfassets.net/0rbfqd9c4jdo/6fFA1Mk0nHVyN316cN0FYC/f2628783ca69a6cc2788d415bc531ea3/neghin-tn.png?fl=progressive",
    imageBefore:
      "https://images.ctfassets.net/0rbfqd9c4jdo/17c5ssH0L1959Mk2y4OwLr/6bf7f8942505ff3bfc57ec05a9aa2b66/neghin-before.jpg?fl=progressive",
    imageAfter:
      "https://images.ctfassets.net/0rbfqd9c4jdo/kEyIBiMRhmSXDMXiTPb3Y/9c7dd9e6a3c0f6f160d684fa7d67d18f/neghin-after.jpg?fl=progressive",
    comment:
      "“I have been taking Nutrafol Postpartum and I realized that my shedding has significantly decreased and because of that my hairline got fuller and my ends got longer. So that was really exciting.”",
    name: "Neghin",
    labels: ["Baby Hairs Growing Out", "Visibly Fuller", "Stronger and Longer"],
  },
  {
    id: 7,
    icon: "https://images.ctfassets.net/0rbfqd9c4jdo/7cwXJtwjFizQmtLhmE4ryi/2ee415e0fd2417fb899922da1ec0397e/tanya-tn.png?fl=progressive",
    imageBefore:
      "https://images.ctfassets.net/0rbfqd9c4jdo/4bjabl4coq6lMcDFo1o9Py/3b71867238f0b5f88aead6a30012fc2c/tanya-before.jpg?fl=progressive",
    imageAfter:
      "https://images.ctfassets.net/0rbfqd9c4jdo/1ExpN6f0hL2hEzE8n0TYL1/ff9c5dec5ed3d97c0af53ef559e81c6d/tanya-after.jpg?fl=progressive",
    comment:
      "“I’ve noticed that when I brush my hair, I don’t shed as much as I used to. I also really feel a difference in the volume of my hair and the thickness. Not only has Nutrafol benefited my hair, it's benefitted my overall wellness, energy, and how I feel on a daily basis.”",
    name: "Tanya",
    labels: [
      "Increased Scalp Coverage",
      "Visibly Less Shedding",
      "Hair Growth",
    ],
  },
];

const SWITCH_DURATION = 1000;
const AUTO_SCROLL_DURATION = 10000;

export function SuccessExamples() {
  const isMounted = useIsMounted();
  const windowWidth = useWindowWidth();
  const time = useTime();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentExample = SUCCESS_EXAMPLES[currentIndex];
  const [autoScroll, setAutoScroll] = useState(true);
  const switchTime = useMotionValue(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const tabScrollProgress = useTransform(time, (time) => {
    if (!autoScroll) return "none";

    const diffTime = time - switchTime.get() - SWITCH_DURATION;
    const degress = (360 / AUTO_SCROLL_DURATION) * diffTime;
    return `conic-gradient(var(--color-my-secondary), var(--color-my-secondary) ${degress}deg, transparent ${degress}deg)`;
  });

  const examplesInTabbar = useMemo(() => {
    if (!isMounted) return [];

    if (windowWidth >= mdBreakpoint) {
      return SUCCESS_EXAMPLES;
    } else {
      const sliceStart =
        (currentIndex - 2 + SUCCESS_EXAMPLES.length) % SUCCESS_EXAMPLES.length;
      return [...SUCCESS_EXAMPLES, ...SUCCESS_EXAMPLES].slice(
        sliceStart,
        sliceStart + 5,
      );
    }
  }, [currentIndex, windowWidth, isMounted]);

  const nextExample = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SUCCESS_EXAMPLES.length);
  }, []);

  const prevExample = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + SUCCESS_EXAMPLES.length) % SUCCESS_EXAMPLES.length,
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScroll) {
        nextExample();
      }
    }, AUTO_SCROLL_DURATION + SWITCH_DURATION);

    return () => clearInterval(interval);
  }, [autoScroll, nextExample]);

  useEffect(() => {
    if (emblaApi) {
      switchTime.set(time.get());
      emblaApi.scrollTo(currentIndex);
    }
  }, [currentIndex, switchTime, time, emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("slidesInView", () => {
        const slidesInView = emblaApi.slidesInView();
        if (slidesInView.length === 1) {
          setCurrentIndex(slidesInView[0]);
        }
      });

      emblaApi.on("pointerUp", () => {
        setAutoScroll(false);
      });

      return () => {
        emblaApi.off("slidesInView", () => {});
        emblaApi.off("pointerUp", () => {});
      };
    }
  }, [emblaApi]);

  return (
    <section className="max-w-[var(--width-max)] mx-auto flex flex-col px-6 md:px-8 lg:px-12 xl:px-28 pt-18 md:pt-24 lg:pt-36 bg-base-100">
      <h2 className="mx-auto font-serif text-3xl md:text-4xl lg:text-5xl max-w-70 md:max-w-full text-center">
        Join the 1.5 million+ people growing.
      </h2>

      <div className="flex items-center justify-between mt-10 md:mt-14 relative mx-auto lg:w-200">
        <button
          className="bg-base-content/15 hover:bg-base-content/20 rounded p-1 cursor-pointer"
          onClick={() => {
            setAutoScroll(false);
            prevExample();
          }}
        >
          <GrLinkPrevious />
        </button>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between w-2/3 md:w-[calc(100%-128px)] overflow-hidden">
          {examplesInTabbar.map((example) => (
            <div
              key={example.id}
              className="flex items-center justify-center w-1/3 md:w-auto min-w-1/3 md:min-w-auto -translate-x-full md:translate-x-0"
            >
              <motion.button
                className={cn(
                  "size-14 rounded-full overflow-hidden relative flex items-center justify-center",
                  currentExample.id === example.id && "bg-base-content/15",
                )}
                layout="position"
                style={{
                  backgroundImage:
                    currentExample.id === example.id
                      ? tabScrollProgress
                      : "none",
                }}
                transition={{
                  duration: 0.5,
                }}
                onClick={() => {
                  setCurrentIndex(example.id);
                }}
              >
                <Image
                  src={example.icon}
                  alt={example.name}
                  className={cn(
                    "w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full",
                    currentExample.id === example.id
                      ? "opacity-100"
                      : "opacity-50",
                  )}
                  width={100}
                  height={100}
                />
              </motion.button>
            </div>
          ))}
        </div>

        <button
          className="bg-base-content/15 hover:bg-base-content/20 rounded p-1 cursor-pointer"
          onClick={() => {
            setAutoScroll(false);
            nextExample();
          }}
        >
          <GrLinkNext />
        </button>
      </div>

      <div
        ref={emblaRef}
        className="embla overflow-hidden border border-base-content/15 mt-12 xl:mt-24 rounded"
      >
        <div className="embla__container w-full h-180 md:h-190 lg:h-230 xl:h-120 text-base-content/90 flex">
          {SUCCESS_EXAMPLES.map((example) => (
            <div
              key={example.id}
              className="embla__slide flex flex-col xl:flex-row w-full min-w-full mr-2"
            >
              <div className="w-full flex xl:h-full xl:w-auto relative">
                <Image
                  src={example.imageBefore}
                  alt={example.name}
                  width={700}
                  height={700}
                  className="w-1/2 h-auto object-cover"
                />
                <Image
                  src={example.imageAfter}
                  alt={example.name}
                  width={700}
                  height={700}
                  className="w-1/2 h-auto object-cover"
                />
                <p className="bg-base-100 uppercase text-xs p-1 rounded-xs absolute bottom-2 left-2">
                  Before
                </p>
                <p className="bg-base-100 uppercase text-xs p-1 rounded-xs absolute bottom-2 left-[calc(50%+8px)]">
                  3 Month Growing
                </p>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <p className="text-lg xl:text-xl">{example.comment}</p>
                <p className="mt-4 uppercase text-xs">{example.name}</p>
                <div className="mt-8 flex flex-wrap gap-1">
                  {example.labels.map((label) => (
                    <p
                      key={label}
                      className="text-xs uppercase bg-base-content/10 rounded px-2 py-1"
                    >
                      {label}
                    </p>
                  ))}
                </div>
                <p className="mt-auto text-sm text-base-content/60">
                  Taking{" "}
                  <Link href="" className="underline text-my-primary">
                    Nutrafol Postpartum Hair Growth Nutraceutical
                  </Link>
                </p>
                <p className="mt-3 text-xs text-base-content/50">
                  In a 6-month clinical study, participants taking Nutrafol
                  Postpartum saw significant hair growth.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm mx-auto my-8 xl:my-16">
        <div className="bg-my-secondary p-1">
          <GrLinkNext />
        </div>
        See All Results
      </div>
    </section>
  );
}
