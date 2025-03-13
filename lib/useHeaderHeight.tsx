import { useWindowWidth } from "@react-hook/window-size";
import { lgBreakpoint } from "./constants";

export function useHeaderHeight() {
  const windowWidth = useWindowWidth();

  return windowWidth >= lgBreakpoint ? 65 : 93;
}
