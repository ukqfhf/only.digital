import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import styles from "./HistoricalDatesEvents.module.css";
import type { PeriodEvent } from "../shared-domain";

type HistoricalDatesEventsProps = {
  title: string;
  events: PeriodEvent[];
};

export function HistoricalDatesEvents({ events }: HistoricalDatesEventsProps) {
  return (
    <Swiper
      className={styles.container}
      slidesPerView="auto"
      spaceBetween={25}
      breakpoints={{
        568: {
          slidesPerView: 3
        }
      }}
      modules={[Pagination, Navigation]}
      pagination={{
        clickable: true
      }}
    >
      {events.map((event) => (
        <SwiperSlide key={event.year} className={styles.eventsSliderSlide}>
          <h3 className={styles.eventTitle}>{event.year}</h3>
          <p>{event.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
