export type Interval = {
  label: string;
  value: IntervalValue;
  groupBy: IntervalGroupBy;
};
export type IntervalValue = 'week' | 'day' | 'month';
export type IntervalGroupBy = 'yyyy-ww' | 'yyyy-MM-dd' | 'yyyy-MM';

export interface UserLimitOption {
  value: string;
  label: number;
}
