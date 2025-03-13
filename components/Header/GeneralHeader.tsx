"use client";

import { lgBreakpoint } from "@/lib/constants";
import {
  useIsMenPath,
  useIsQuizPath,
  useIsSkinPath,
  useIsWomenPath,
  useProductsBasePath,
  useQuizBasePath,
} from "@/lib/pathname";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { LuUserRound } from "react-icons/lu";
import { MdArrowOutward } from "react-icons/md";
import { CartIcon } from "../CartIcon";
import { NavCloseIcon } from "../NavCloseIcon";
import { NavOpenIcon } from "../NavOpenIcon";
import { NutrafolIcon } from "../NutrafolIcon";
import { NutrafolMenIcon } from "../NutrafolMenIcon";
import { NutrafolSkinIcon } from "../NutrafolSkinIcon";
import { SearchIcon } from "../SearchIcon";

export function GeneralHeader() {
  const headerClasses =
    "w-full max-w-[var(--width-max)] mx-auto transition-all lg:px-6 w-full";
  const header1Ref = useRef<HTMLDivElement>(null);
  const productsLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (window.innerWidth >= lgBreakpoint) {
      return;
    }

    if (header1Ref.current && productsLinkRef.current) {
      const header1Height = header1Ref.current.clientHeight;
      const productsLinkHeight = productsLinkRef.current.clientHeight;
      const top = header1Height - productsLinkHeight;

      productsLinkRef.current.style.top = `${top}px`;
    }
  }, [header1Ref.current?.clientHeight]);

  return (
    <>
      <header
        ref={header1Ref}
        className={cn(headerClasses, "sticky top-0 z-10 lg:static lg:pt-6")}
      >
        <LineOne />
        <LineTwo className="flex lg:hidden" />
      </header>

      <header
        className={cn(headerClasses, "z-10 hidden lg:sticky lg:top-0 lg:block")}
      >
        <LineTwo className="shadow-xl" />
      </header>

      <ProductsLink
        ref={productsLinkRef}
        className="sticky z-0 flex py-2 shadow-xl lg:hidden"
      />
    </>
  );
}

function LineOne({ className }: { className?: string }) {
  const isWomenPath = useIsWomenPath();
  const isMenPath = useIsMenPath();
  const isSkinPath = useIsSkinPath();

  return (
    <div
      className={cn(
        "bg-base-100 flex lg:[&>a:first-child]:rounded-tl lg:[&>a:last-child]:rounded-tr [&>a:not(:last-child)]:border-r-0",
        className,
      )}
    >
      <LineOneLink
        href="/"
        className={cn({ "hidden lg:flex": isWomenPath })}
        hideArrow={isSkinPath}
      >
        Women
      </LineOneLink>

      <LineOneLink
        href="/men"
        className={cn({ "hidden lg:flex": isMenPath })}
        hideArrow={isSkinPath}
      >
        Men
      </LineOneLink>

      <LineOneLink
        href="/skin"
        className={cn({ "hidden md:flex": isSkinPath })}
      >
        Skin
      </LineOneLink>

      <QuizLink className="flex-1 text-xs font-medium lg:hidden" />
      <ProductsLink className="hidden flex-1 text-sm lg:flex" />
    </div>
  );
}

function LineOneLink({
  href,
  children,
  className,
  hideArrow,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  hideArrow?: boolean;
}) {
  const isWomenPath = useIsWomenPath();
  const isMenPath = useIsMenPath();
  const isSkinPath = useIsSkinPath();
  const isQuizPath = useIsQuizPath();
  const quizBasePath = useQuizBasePath();

  const isActive = (() => {
    if (href === "/") return isWomenPath;
    if (href === "/men") return isMenPath;
    if (href === "/skin") return isSkinPath;
    if (href === quizBasePath) return isQuizPath;
  })();

  return (
    <Link
      href={href}
      className={cn(
        "hover:bg-base-300 bg-base-100 border-base-content/20 text-base-content/70 flex h-11 flex-1 items-center justify-center border text-xs lg:h-9 lg:max-w-[100px] lg:text-sm",
        { "!border-b-base-100 text-base-content/90 font-medium": isActive },
        className,
      )}
    >
      {children}
      <MdArrowOutward
        className={cn("size-4 lg:hidden", { hidden: hideArrow })}
      />
    </Link>
  );
}

function QuizLink({ className }: { className?: string }) {
  const quizBasePath = useQuizBasePath();

  return (
    <Link
      href={quizBasePath}
      className={cn(
        "bg-my-primary hover:bg-my-primary-hover text-base-100 flex items-center justify-center",
        className,
      )}
    >
      Take the Quiz
    </Link>
  );
}

function ProductsLink({
  className,
  ref,
}: {
  className?: string;
  ref?: React.Ref<HTMLAnchorElement>;
}) {
  const productsBasePath = useProductsBasePath();

  return (
    <Link
      ref={ref}
      href={productsBasePath}
      className={cn(
        "bg-accent-content/10 text-base-content/90 flex items-center justify-center text-xs font-medium",
        className,
      )}
    >
      Fullest Hair Kit for visible results in as little as 3 months.&nbsp;
      <em>Shop Now</em>
    </Link>
  );
}

function LineTwo({ className }: { className?: string }) {
  const isWomenPath = useIsWomenPath();
  const isMenPath = useIsMenPath();
  const isSkinPath = useIsSkinPath();

  return (
    <div
      className={cn(
        "border-base-content/20 bg-base-100 relative flex items-center border-b px-6 py-3 lg:rounded-b lg:border-x lg:py-2",
        className,
      )}
    >
      <div className="lg:hidden">
        <NavOpenIcon className="size-5" />
        <NavCloseIcon className="hidden size-5" />
      </div>

      <div className="text-base-content/80 -ml-4 hidden gap-6 font-medium tracking-tight transition-all duration-300 min-[1100px]:gap-7 min-[1280px]:-ml-0 min-[1280px]:gap-12 lg:flex">
        <div>Product +</div>
        <div>Science +</div>
        <div>Results</div>
        <div>Shed the Silence</div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <NutrafolIcon className={cn("h-4 lg:h-5", { hidden: !isWomenPath })} />
        <NutrafolMenIcon className={cn("h-4 lg:h-5", { hidden: !isMenPath })} />
        <NutrafolSkinIcon
          className={cn("h-4 lg:h-5", { hidden: !isSkinPath })}
        />
      </div>

      <div className="mr-0 ml-auto flex items-center gap-4 lg:gap-8">
        <QuizLink className="hidden rounded-sm px-4 py-3 lg:flex" />
        <SearchIcon className="size-6" />
        <LuUserRound className="hidden size-6 lg:flex" strokeWidth={1} />
        <CartIcon className="size-6" />
      </div>
    </div>
  );
}
