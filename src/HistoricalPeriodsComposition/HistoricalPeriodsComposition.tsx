import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
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
  const titleRef = useRef<HTMLHeadingElement>(null);

  const activePeriodIdx = useSwiperActiveIndex(swiperRef);

  useEffect(() => {
    if (titleRef.current) {
      const tl = gsap.timeline();

      tl.to(titleRef.current, {
        rotationX: 90,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }).to(titleRef.current, {
        rotationX: 0,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.2)"
      });
    }
  }, [activePeriodIdx, titleRef]);

  const currentPeriod = periods[activePeriodIdx];

  const periodStartYear = currentPeriod?.events.at(0)?.year;
  const periodEndYear = currentPeriod?.events.at(-1)?.year;

  return (
    <section className={styles.container}>
      <h2 className={styles.title} ref={titleRef}>
        <span className={styles.periodStart}>{periodStartYear}</span>
        <span className={styles.periodEnd}>{periodEndYear}</span>
      </h2>
    </section>
  );
}
