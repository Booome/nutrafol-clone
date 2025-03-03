import { HeroView } from "./components/HeroView";

export default function Page() {
  return (
    <>
      <HeroView />

      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="mt-2 h-10 w-full bg-red-200">
          Line {index + 1}
        </div>
      ))}
    </>
  );
}
