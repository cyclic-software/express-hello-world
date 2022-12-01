import { IOrder } from './orders';
import { ISchedule } from './schedule';
import { IScreen } from './screen';
import { IShow } from './shows';

export interface IOrdersResponse {
  amount: number;
  onPage: number;
  orders: IOrder[];
}

export interface IOrdersSummaryResponse {
  noOfActive: number;
  noOfCompleted: number;
  noOfLogsPending: number;
  noOfPlaned: number;
  noOfProblematic: number;
  noOfUnoptimized: number;
  problematicPercent: number;
}

export type ISchedulesResponse = ISchedule[];

export type IScreensResponse = IScreen[];

export type IShowsResponse = IShow[];
