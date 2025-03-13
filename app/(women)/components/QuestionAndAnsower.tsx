"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useMemo } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const GroupContext = React.createContext<{
  openIndex: number;
  setOpenIndex: (openIndex: number) => void;
  getIndex: () => number;
}>({
  openIndex: -1,
  setOpenIndex: () => {},
  getIndex: () => 0,
});
const CardContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function QuestionAndAnsower() {
  return (
    <section className="max-w-[var(--width-max)] mx-auto bg-base-100 px-8 lg:px-12 py-10 lg:py-20 lg:flex lg:justify-between lg:gap-8">
      <h2 className="font-serif text-[28px] md:text-[34px] lg:text-5xl/14 lg:flex-1">
        We&apos;re serious about
        <br className="hidden lg:block" /> facts.
        <br className="lg:hidden" />
        Ask away.
      </h2>

      <QAndAGroup className="mt-6 lg:mt-0 lg:flex-1">
        <QAndACard>
          <QAndAQuestion>How do I get started?</QAndAQuestion>
          <QAndAAnswer>
            You&apos;re unique, and your hair growth plan should be too.
            That&apos;s why we created our <a href="">Hair Wellness</a> Quiz—a
            quick 3-minute assessment that allows us to better understand your
            specific root causes of hair thinning and recommend a personalized
            product regimen that will give you results.
          </QAndAAnswer>
        </QAndACard>

        <QAndACard>
          <QAndAQuestion>Is Nutrafol suitable for everyone?</QAndAQuestion>
          <QAndAAnswer>
            <p>
              Not only is Nutrafol suitable for most people, but our hair growth
              supplements are specifically formulated to meet you where you are
              in life. We have 5 Nutraceutical formulas that are tailored to the
              bio-specific needs of men and women throughout all life stages:
              Women&apos;s, Women&apos;s Vegan, Postpartum for the first year
              after childbirth or while breastfeeding, Women&apos;s Balance for
              peri- and postmenopause, and Men&apos;s.
            </p>
            <p>
              Please note: We do not recommend Nutrafol to anyone under the age
              of 18. Also, while we have no reason to believe it&apos;s harmful,
              there have not been enough studies for us to say Nutrafol is
              suitable during pregnancy—so we recommend skipping it while
            </p>
          </QAndAAnswer>
        </QAndACard>

        <QAndACard>
          <QAndAQuestion>
            What is the difference between Nutrafol&apos;s Hair Growth
            Nutraceuticals?
          </QAndAQuestion>
          <QAndAAnswer>
            <p>
              Our Hair Growth Nutraceuticals are clinically effective and
              physician-formulated to the bio-specific needs of men and women
              through all life stages and lifestyles.* The key root causes of
              thinning hair affect men and women differently and can change over
              time—so we created multiple formulas to give your hair exactly
              what it needs, when it needs it most.
            </p>
            <p>
              Women&apos;s formula focuses on addressing the key root causes of
              hair thinning for women 18-44 years old when stress, lifestyle
              habits, and nutrition play a heightened role in hair health.
            </p>
            <p>
              Women&apos;s Vegan is formulated for women 18-44 with the key root
              causes of thinning focusing on stress and lifestyle habits, plus
              it is optimized to support plant-based diet&apos;s nutrition and
              absorption of nutrients in the body that affect hair health.
            </p>
            <p>
              Women&apos;s Balance is formulated for women 45+ to support the
              key root causes of hair thinning for women, such as stress, with
              optimized support for hormonal changes, such as menopause, that
              affect hair health.
            </p>
            <p>
              Postpartum is OBGYN-formulated to address the key root causes of
              hair thinning and shedding for women within the first year of
              giving birth and through the time they are breastfeeding, such as
              the physical and emotional stress, hormonal changes, and
              nutritional support.
            </p>
            <p>
              Men&apos;s formula multi-targets the key root causes of thinning
              for men 18+, such as stress and poor nutrition, with optimized
              support of hair growth-inhibiting DHT hormone, without
              compromising sexual performance.
            </p>
          </QAndAAnswer>
        </QAndACard>

        <QAndACard>
          <QAndAQuestion>Will Nutrafol work for my hair type?</QAndAQuestion>
          <QAndAAnswer>
            <p>
              Nutrafol products were formulated to promote hair growth and hair
              wellness for all types of hair. While the characteristics of hair
              strands may vary by ethnicity, the underlying root causes that
              affect hair follicles can affect all people equally.
            </p>
            <p>
              In a recent clinical study, we examined the effectiveness of
              Nutrafol in African American, Asian, Hispanic, and non-Hispanic
              men and women. All ethnicities saw less shedding after 2 months
              and improved thickness, growth rate, scalp coverage, and shine
              after 6 months of taking our Hair Growth Nutraceuticals.
            </p>
          </QAndAAnswer>
        </QAndACard>

        <QAndACard className="border-b-0">
          <QAndAQuestion>When can I expect to see results?</QAndAQuestion>
          <QAndAAnswer>
            <p>
              Everyone&apos;s experience is different, but in our clinical
              studies, women showed results in 3-6 months. It&apos;s important
              to remember that healthy hair growth takes time—and of course,
              consistency is key. If you take Nutrafol daily, here&apos;s a
              snapshot of what you&apos;re likely to experience:
            </p>
            <p>
              <strong>1-3 months:</strong> Strengthen hair from within. Look for
              shinier hair with less shedding and breakage.
            </p>
            <p>
              <strong>3-6 months:</strong> You may notice improvement in
              fullness and volume.
            </p>
            <p>
              <strong>6+ months:</strong> Experience visible changes like
              faster-growing hair that&apos;s thicker and stronger with more
              scalp coverage.
            </p>
            <p>
              Commitment to Nutrafol has whole-body rewards, too. Our
              ingredients are shown to promote more restful sleep, less stress,
              better mood, and clearer skin. A little something we call side
              benefits.
            </p>
          </QAndAAnswer>
        </QAndACard>
      </QAndAGroup>
    </section>
  );
}

function QAndAGroup({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState(-1);
  const idCounter = React.useRef(0);

  const getIndex = React.useCallback(() => {
    return idCounter.current++;
  }, []);

  return (
    <GroupContext.Provider value={{ openIndex, setOpenIndex, getIndex }}>
      <div className={cn("", className)}>
        <div className="w-full h-[6px] rounded-t border-t border-x border-base-content/20"></div>
        {children}
        <div className="w-full h-[6px] rounded-b border-b border-x border-base-content/20"></div>
      </div>
    </GroupContext.Provider>
  );
}

function QAndACard({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { openIndex, setOpenIndex, getIndex } = React.useContext(GroupContext);
  const index = useMemo(() => getIndex(), [getIndex]);
  const isOpen = openIndex === index;
  const setIsOpen = (isOpen: boolean) => {
    setOpenIndex(isOpen ? index : -1);
  };

  return (
    <CardContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        className={cn(
          "p-4 md:p-5 lg:p-6 border-b border-base-content/20",
          className,
        )}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}

function QAndAQuestion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, setIsOpen } = React.useContext(CardContext);

  return (
    <button
      className={cn(
        "w-full font-semibold text-xs lg:text-base text-left tracking-wider flex items-center justify-between gap-4",
        className,
      )}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {children}
      <div className="flex items-center gap-2 bg-base-content/20 p-[6px]">
        {isOpen ? <FiMinus /> : <FiPlus />}
      </div>
    </button>
  );
}

function QAndAAnswer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen } = React.useContext(CardContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(className)}
          initial={{ height: 0, opacity: 0, overflow: "hidden" }}
          animate={{ height: "auto", opacity: 1, overflow: "visible" }}
          exit={{ height: 0, opacity: 0, overflow: "hidden" }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          <div className="text-xs lg:text-[13px] font-thin mt-8 [&>p]:mt-4 [&_a]:underline">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
