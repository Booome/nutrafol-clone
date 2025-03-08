import { LinkButton } from "./LinkButton";

const causeData = [
  {
    title: "Hormones",
    description:
      "DHT sensitivity can be caused by genetics, stress, poor diet, and toxins.",
  },
  {
    title: "DHT",
    description:
      "Physical or emotional stress like giving birth or a demanding job.",
  },
  {
    title: "Thyroid",
    description:
      "Nutrient gaps that can result from a poor diet or a compromised gut microbiome.",
  },
  {
    title: "Lifestyle",
    description:
      "Refers to your surroundings, the products you use, and the foods you eat.",
  },
  {
    title: "Metabolism",
    description:
      "Influences how hair follicles receive nutrients from the body.",
  },
  {
    title: "Aging",
    description:
      "Aging reduces the scalp’s collagen and elastin, weakening its grip on hair strands.",
  },
];

export function NavToRootCause() {
  return (
    <div className="flex flex-col items-center bg-base-100 pt-12 px-6 md:px-8 lg:px-12 xl:px-24 pb-10 lg:pb-16">
      <h2 className="text-center font-serif text-pretty text-base-content/90 text-3xl md:text-4xl lg:text-5xl max-w-100 md:max-w-150 lg:max-w-200">
        Healthy hair starts from within. Take a whole-body approach and{" "}
        <em>target key root causes of hair thinning.</em>
      </h2>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-[1px] border border-neutral-content rounded overflow-hidden">
        {causeData.map((cause) => (
          <div
            key={cause.title}
            className="p-4 md:p-6 lg:p-8 border border-neutral-content text-sm lg:text-lg -m-[1px] text-base-content/90"
          >
            <p className="font-semibold tracking-wide">{cause.title}</p>
            <p className="mt-11 md:mt-21 lg:text-base">{cause.description}</p>
          </div>
        ))}
      </div>

      <LinkButton href="/" className="mt-8 lg:mt-14">
        Take the Quiz to F Your Root Causes
      </LinkButton>
    </div>
  );
}
