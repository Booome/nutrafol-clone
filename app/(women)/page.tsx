import { HeroView } from "./components/HeroView";

export default function Page() {
  return (
    <>
      <HeroView />

      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index} className="h-10 w-10 bg-red-500">
          {index}
        </div>
      ))}
    </>
  );
}
