import useBreakpoint from "./useBreakpoint.js";

export default function useResponsiveClass(prefix) {
    const breakpoint = useBreakpoint();
    return `${prefix}-${breakpoint}`;
}