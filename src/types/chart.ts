export type Interval = {
  id: string;
  labelKey: string;
  value: IntervalValue;
  groupBy: IntervalGroupBy;
};
export type IntervalValue = 'week' | 'day' | 'month';
export type IntervalGroupBy = 'YYYY-ww' | 'YYYY-MM-DD' | 'YYYY-MM';

export interface MemberLimit {
  value: string;
  label: string;
}
