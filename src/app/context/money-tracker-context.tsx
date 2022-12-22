import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  DataModel,
  TDefaultTrackerValues,
  TMoneyTrackerData,
} from '../../shared';

const defaultContextValues: TDefaultTrackerValues = {
  data: [],
  addData: () => Promise.resolve(),
  removeData: () => Promise.resolve(),
  getMonthlyData: () => [],
};

const MoneyTrackerContext = createContext(defaultContextValues);

const useMoneyTracker = () => useContext(MoneyTrackerContext);

const MoneyTrackerProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<TMoneyTrackerData[]>([
    {
      id: 1,
      title: 'Title 1',
      price: 1000,
      category: 'clothes',
      date: '2022-12-03',
    },
    {
      id: 2,
      title: 'Title 2',
      price: 1000,
      category: 'transport',
      date: '2022-12-04',
    },
    {
      id: 4,
      title: 'Title 4',
      price: 200,
      category: 'transport',
      date: '2021-12-06',
    },
    {
      id: 5,
      title: 'Title 5',
      price: 1000,
      category: 'transport',
      date: '2022-11-01',
    },
    {
      id: 3,
      title: 'Title 3',
      price: 500,
      category: 'food',
      date: '2022-11-01',
    },
  ]);

  const addData = useCallback(
    (type: string, formData: TMoneyTrackerData) => {
      const id = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      const modelPrice = Number(formData.price.toString().replace(/\D/g, ''));
      const price = type === 'expense' ? -1 * modelPrice : modelPrice;
      const { title, category, date } = formData;
      setData((prev) => [
        ...prev,
        new DataModel(id, title, price, category, date),
      ]);
    },
    [data]
  );

  const removeData = (id: number) => {
    setData((prev) => prev.filter((o) => o.id !== id));
  };

  const getMonthlyData = (array: TMoneyTrackerData[], yearAndMonth: string) =>
    array.filter(
      (o) => `${o.date.split('-')[0]}-${o.date.split('-')[1]}` === yearAndMonth
    );

  const value = useMemo(
    () => ({
      data,
      removeData,
      addData,
      getMonthlyData,
    }),
    [addData, data]
  );

  return (
    <MoneyTrackerContext.Provider value={value}>
      {children}
    </MoneyTrackerContext.Provider>
  );
};

export { MoneyTrackerProvider, useMoneyTracker };
