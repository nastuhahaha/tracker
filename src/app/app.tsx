import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AddExpenseIncome, Compare, Home, Layout } from '../shared/ui';

export const Application: FC = (): JSX.Element => (
  <div className="App">
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-expense-income" element={<AddExpenseIncome />} />
        <Route path="/compare-expense-income-by-month" element={<Compare />} />
      </Routes>
    </Layout>
  </div>
);
