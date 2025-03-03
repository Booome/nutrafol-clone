"use client";

import { useIsQuizPath } from "@/lib/pathname";
import { GeneralHeader } from "./GeneralHeader";

export function Header() {
  const isQuizPath = useIsQuizPath();

  if (isQuizPath) return <QuizHeader />;

  return <GeneralHeader />;
}

function QuizHeader() {
  return null;
}
