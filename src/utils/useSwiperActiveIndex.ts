import { useEffect, useState, type RefObject } from "react";
import type { SwiperClass } from "swiper/react";

export function useSwiperActiveIndex(swiperRef: RefObject<SwiperClass | null>) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    setActiveIndex(swiper.activeIndex);

    const handleSlideChange = () => {
      setActiveIndex(swiper.activeIndex);
    };

    swiper.on("slideChange", handleSlideChange);
    return () => swiper.off("slideChange", handleSlideChange);
  }, [swiperRef.current]);

  return activeIndex;
}
