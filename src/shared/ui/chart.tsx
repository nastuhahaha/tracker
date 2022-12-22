import { Bar, BarChart, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';

import { TMoneyTrackerData } from '../types';

type Props = {
  sortedData: TMoneyTrackerData[];
};
export const Chart = ({ sortedData }: Props) => (
  <BarChart
    width={300}
    height={200}
    data={sortedData.sort(
      (a, b) =>
        Number(a.date.split('-')[0]) - Number(b.date.split('-')[0]) ||
        Number(a.date.split('-')[1]) - Number(b.date.split('-')[1])
    )}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <ReferenceLine y={0} stroke="#000" />
    <Bar dataKey="price" fill="#8884d8" />
  </BarChart>
);
