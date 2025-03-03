import { usePathname } from "next/navigation";

export function useIsWomenPath() {
  const isMenPath = useIsMenPath();
  const isSkinPath = useIsSkinPath();
  const isQuizPath = useIsQuizPath();

  return !isMenPath && !isSkinPath && !isQuizPath;
}

export function useIsMenPath() {
  const pathname = usePathname();

  return pathname.startsWith("/men");
}

export function useIsSkinPath() {
  const pathname = usePathname();

  return pathname.startsWith("/skin");
}

export function useIsQuizPath() {
  const pathname = usePathname();

  return pathname.startsWith("/quiz") || pathname.startsWith("/men/quiz");
}

export function useQuizBasePath() {
  const isWomenPath = useIsWomenPath();
  const isMenPath = useIsMenPath();

  return isWomenPath ? "/quiz" : isMenPath ? "/men/quiz" : "";
}

export function useProductsBasePath() {
  const isWomenPath = useIsWomenPath();
  const isMenPath = useIsMenPath();

  return isWomenPath ? "/products" : isMenPath ? "/men/products" : "";
}
