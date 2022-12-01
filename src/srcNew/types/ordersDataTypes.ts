import { ISchedule } from 'src/types';

export interface IOrderColumnStructure {
  col_name: string;
  col_visible: boolean;
  col_label: string;
  col_type: string;
  col_value: any;
  col_subValue: any;
  col_width: number;
  col_minWidth: number;
  col_sort: any;
}
export interface IOrderSummeryStructure {
  className: string;
  response: string;
  label: string;
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

export interface IOrder {
  endDate: string;
  startDate: string;
  id: number;
  noOfSchedules: number;
  noOfScreens: number;
  orderId: string;
  playedPercent: number;
  spotsAvailable: number;
  spotsPlayed: number;
  spotsScheduled: number;
}

export type ISchedulesResponse = ISchedule[];
