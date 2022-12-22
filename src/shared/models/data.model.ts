import { TMoneyTrackerData } from '../types';

export class DataModel implements TMoneyTrackerData {
  id: number;

  title: string;

  price: number;

  category: string;

  date: string;

  constructor(
    id: number,
    title: string,
    price: number,
    category: string,
    date: string
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.date = date;
  }
}
