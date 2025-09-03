import { useRef } from "react";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { Keyboard, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { HistoricalPeriodsComposition } from "../HistoricalPeriodsComposition";
import { HistoricalPeriodsNavigation } from "../HistoricalPeriodsNavigation";
import { HistoricalDatesEvents } from "../HistoricalDatesEvents";
import { CirclesNavigation } from "../CirclesNavigation";
import styles from "./HistoricalPeriods.module.css";
import type { Period } from "../shared-domain";

type HistoricalPeriodsProps = {
  periods: Period[];
};

export function HistoricalPeriods({ periods }: HistoricalPeriodsProps) {
  const swiperRef = useRef<SwiperClass>(null);

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Исторические даты</h1>

      <HistoricalPeriodsComposition swiperRef={swiperRef} periods={periods} />
      <CirclesNavigation swiperRef={swiperRef} periods={periods} />

      <div className={styles.highlightsSliderContainer}>
        <Swiper
          className={styles.highlightsSlider}
          modules={[Keyboard, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          allowTouchMove={false}
          simulateTouch={false}
          mousewheel={false}
          keyboard={{
            enabled: true,
            onlyInViewport: true
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {periods.map((period) => (
            <SwiperSlide
              key={period.title}
              className={styles.highlightsSliderSlide}
            >
              <HistoricalDatesEvents
                title={period.title}
                events={period.events}
              />
            </SwiperSlide>
          ))}
          <HistoricalPeriodsNavigation periods={periods} />
        </Swiper>
      </div>
    </section>
  );
}
