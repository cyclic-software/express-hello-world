import { useQuery } from '@tanstack/react-query';

import { BaseApiURL } from 'src/consts';
import { IScreensResponse } from 'src/types/response';

import { queryFactory } from '../helper';

export const useSchedules = (orderId: string, scheduleId: string, startDate: string, endDate: string) =>
  useQuery<IScreensResponse>(
    ['screens', orderId, scheduleId, startDate, endDate],
    queryFactory(
      `${BaseApiURL}/orders/${encodeURIComponent(
        orderId,
      )}/schedules/${scheduleId}/screens?from=${startDate}&to=${endDate}`,
    ),
  );
