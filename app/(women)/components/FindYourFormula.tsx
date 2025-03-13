import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "./LinkButton";

const formulaData = [
  {
    formula: "18-44",
    title: "Women",
    formulaLong: "For Women 18-44 experiencing signs of hair thinning",
    imgUrl:
      "https://images.ctfassets.net/0rbfqd9c4jdo/6SKgaItY9KAaTjjHzUIuRY/7de61e796cc077412bdea1c0f2c0d31f/product-women.png?fl=progressive&w=400",
    linkText: "Shop Women's",
    href: "",
  },
  {
    formula: "45+",
    title: "Women's Balance",
    formulaLong: "For Women 45+ experiencing hair thinning",
    imgUrl:
      "https://images.ctfassets.net/0rbfqd9c4jdo/6IvAhsyOqyBRsDWy5rnfVK/840bfed06b5234c353b85cda32fe53e5/product-balance.png?fl=progressive&w=400",
    linkText: "Show Balance",
    href: "",
  },
  {
    formula: "18-44 plant-based",
    title: "Women's Vegan",
    formulaLong: "For Women 18-44 with plant-based lifestyles",
    imgUrl:
      "https://images.ctfassets.net/0rbfqd9c4jdo/7vyev0TMEbusfjNOQwrvkU/697e821f9b9b6488cc0e64918221f4ad/vegan.png?fl=progressive&w=400",
    linkText: "Show Women's Vegan",
    href: "",
  },
  {
    formula: "post-childbirth",
    title: "Postpartum",
    formulaLong: "For Women 18-44 with plant-based lifestyles",
    imgUrl:
      "https://images.ctfassets.net/0rbfqd9c4jdo/5zjIqnesQPzeB2sCLBQ0LG/864d523a552ac6a327edd776af916593/product-postpartum.png?fl=progressive&w=400",
    linkText: "Show Postpartum",
    href: "",
  },
];

export function FindYourFormula() {
  return (
    <div className="w-full flex flex-col items-stretch bg-base-100 text-base-content/80 md:px-6 lg:px-0 pb-1">
      <Image
        src="https://images.ctfassets.net/0rbfqd9c4jdo/6tZtPPywMCfD9TgWAMFsAV/4884b281e35156ab08efd7d8c55620a3/productlist-hero-desktop.jpg?fl=progressive"
        alt="A woman with long, healthy hair"
        width={1920}
        height={1080}
        className="w-full"
      />

      <div className="max-w-[var(--width-max)] mx-auto flex flex-col bg-base-100 items-center lg:mx-12 xl:mx-28 lg:-mt-58">
        <h2 className="font-serif bg-base-100 text-3xl md:text-4xl lg:text-5xl w-full text-center py-6 lg:py-8 md:border-x lg:border-t border-neutral-content">
          Find your formula
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] text-sm md:text-xs w-[calc(100%-2px)]">
          {formulaData.map((formula) => (
            <div
              key={formula.formula}
              className="flex flex-col items-center text-center p-5 md:p-7 border border-neutral-content -m-[1px]"
            >
              <p className="lg:hidden">For women</p>
              <p className="lg:hidden">{formula.formula}</p>
              <p className="hidden lg:block lg:w-full lg:text-left lg:text-xl lg:font-semibold">
                {formula.title}
              </p>
              <p className="hidden lg:block lg:text-left lg:mt-1 lg:text-sm">
                {formula.formulaLong}
              </p>
              <Image
                src={formula.imgUrl}
                alt={formula.formula}
                width={250}
                height={250}
                className="my-1 md:w-30 md:py-3 lg:mt-auto lg:w-35"
              />
              <Link
                href={formula.href}
                className="text-my-primary border-b border-my-primary lg:hidden"
              >
                {formula.linkText}
              </Link>
              <LinkButton
                href={formula.href}
                className="hidden lg:flex lg:h-12 xl:h-14"
              >
                Show Now
              </LinkButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
