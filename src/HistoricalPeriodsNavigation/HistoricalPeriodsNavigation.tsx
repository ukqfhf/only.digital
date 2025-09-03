import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./HistoricalPeriodsNavigation.module.css";
import type { Period } from "../shared-domain";

type HistoricalPeriodsNavigationProps = {
  periods: Period[];
};

export function HistoricalPeriodsNavigation({
  periods
}: HistoricalPeriodsNavigationProps) {
  const swiper = useSwiper();

  const [currentSlide, setCurrentSlide] = useState(swiper.realIndex + 1);

  useEffect(() => {
    swiper.on("slideChange", () => {
      setCurrentSlide(swiper.realIndex + 1);
    });
  }, [swiper]);

  return (
    <div className={styles.container}>
      <p className={styles.paginationFraction}>
        {currentSlide} / {periods.length}
      </p>
      <button
        className={clsx(styles.navigationButton)}
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeft />
      </button>
      <button
        className={styles.navigationButton}
        onClick={() => swiper.slideNext()}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
