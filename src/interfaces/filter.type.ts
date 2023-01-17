export type IFilterParams = {
  type: 'text' | 'number' | 'rangenumber' | 'date' | 'daterange';
  value: string | number | number[] | Date | Date[] | null;
};
