import { useQuery } from '@tanstack/react-query';

import { BaseApiURL } from 'src/consts';
import { ISchedulesResponse } from 'src/types/response';

import { queryFactory } from '../helper';

export const useSchedules = (orderId: string, startDate: string, endDate: string) =>
  useQuery<ISchedulesResponse>(
    ['campaingsOrders', orderId, startDate, endDate],
    queryFactory(`${BaseApiURL}/orders/${encodeURIComponent(orderId)}/schedules?from=${startDate}&to=${endDate}`),
  );
