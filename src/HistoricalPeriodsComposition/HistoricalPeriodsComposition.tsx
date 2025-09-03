import { type RefObject } from "react";
import type { SwiperClass } from "swiper/react";
import type { Period } from "../shared-domain";

import styles from "./HistoricalPeriodsComposition.module.css";
import { useSwiperActiveIndex } from "../utils/useSwiperActiveIndex";

type HistoricalPeriodsCompositionProps = {
  swiperRef: RefObject<SwiperClass | null>;
  periods: Period[];
};

export function HistoricalPeriodsComposition({
  swiperRef,
  periods
}: HistoricalPeriodsCompositionProps) {
  const activePeriodIdx = useSwiperActiveIndex(swiperRef);

  const currentPeriod = periods[activePeriodIdx];

  const periodStartYear = currentPeriod?.events.at(0)?.year;
  const periodEndYear = currentPeriod?.events.at(-1)?.year;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.periodStart}>{periodStartYear}</span>
        <span className={styles.periodEnd}>{periodEndYear}</span>
      </h2>
    </section>
  );
}
