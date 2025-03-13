import { ClinicalTesting } from "./components/ClinicalTesting";
import { FindYourRootCause } from "./components/FindYourRootCause";
import { Fottnotes } from "./components/Fottnotes";
import { GrowthVision } from "./components/GrowthVision";
import { HeroView } from "./components/HeroView";
import { JoinTheCommunity } from "./components/JoinTheCommunity";
import { QuestionAndAnsower } from "./components/QuestionAndAnsower";
import { SuccessExamples } from "./components/SuccessExamples";
import { TrustedByDoctors } from "./components/TrustedByDoctors";

export default function Page() {
  return (
    <div>
      <HeroView />
      <FindYourRootCause />
      <GrowthVision />
      <SuccessExamples />
      <TrustedByDoctors />
      <ClinicalTesting />
      <QuestionAndAnsower />
      <JoinTheCommunity />
      <Fottnotes />
    </div>
  );
}
