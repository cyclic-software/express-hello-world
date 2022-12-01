export interface ISchedule {
  composition: string;
  createdOn: string;
  days: string;
  endDate: string;
  name: string;
  noOfScreens: number;
  orderId: string;
  playedPercent: number;
  position: string;
  prefPosition: string;
  scheduleId: number;
  shows: string;
  spotRepetition: number;
  spotsAvailable: number;
  spotsPlayed: number;
  spotsPlayedPercent: number;
  spotsScheduled: number;
  startDate: string;
  takenPercent: number;
  totalNotPlayed: number;
  totalNotTaken: number;
  totalPlayed: number;
  totalTaken: number;
}
