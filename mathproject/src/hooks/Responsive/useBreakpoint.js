import useWindowSize from "./useWindowSize.js";

const MOBILE_MAX_WIDTH = 576;
const TABLET_MAX_WIDTH = 992;

export default function useBreakpoint(){
    const {width} = useWindowSize();

    if (width < MOBILE_MAX_WIDTH) {
        return 'mobile';
    } else if (width < TABLET_MAX_WIDTH) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}