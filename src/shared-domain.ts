export type PeriodEvent = {
  year: number;
  description: string;
};

export type Period = {
  title: string;
  events: PeriodEvent[];
};
