import { FindYourFormula } from "./components/FindYourFormula";
import { GrowthVision } from "./components/GrowthVision";
import { HeroView } from "./components/HeroView";
import { NavToRootCause } from "./components/NavToRootCause";

export default function Page() {
  return (
    <>
      <HeroView />
      <NavToRootCause />
      <FindYourFormula />
      <GrowthVision />

      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index} className="h-10 w-10 bg-red-500">
          {index}
        </div>
      ))}
    </>
  );
}
