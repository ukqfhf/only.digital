import styles from "./HistoricalDates.module.css";

type Event = {
  year: number;
  description: string;
};

type Highlight = {
  title: string;
  events: Event[];
};

type HistoricalDatesProps = {
  highlights: Highlight[];
};

export function HistoricalDates({ highlights }: HistoricalDatesProps) {
  console.log(highlights);

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Исторические даты</h1>
    </section>
  );
}
