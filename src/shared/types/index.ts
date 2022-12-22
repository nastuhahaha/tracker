export type TMoneyTrackerData = {
  id: number;
  title: string;
  price: number | string;
  category: string;
  date: string;
};

export type TFormData = Omit<TMoneyTrackerData, 'id'>;

export type TDefaultTrackerValues = {
  data: TMoneyTrackerData[];
  addData: (type: string, formData: TMoneyTrackerData) => void;
  removeData: (id: number) => void;
  getMonthlyData: (
    array: TMoneyTrackerData[],
    yearAndMonth: string
  ) => TMoneyTrackerData[];
};
