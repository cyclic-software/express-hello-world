import { useQuery } from '@tanstack/react-query';

import { BaseApiURL } from 'src/consts';
import { IShowsResponse } from 'src/types/response';

import { queryFactory } from '../helper';

export const useShows = (orderId: string, scheduleId: string, screenId: string, startDate: string, endDate: string) =>
  useQuery<IShowsResponse>(
    ['screens', orderId, scheduleId, screenId, startDate, endDate],
    queryFactory(
      `${BaseApiURL}/orders/${encodeURIComponent(
        orderId,
      )}/schedules/${scheduleId}/screens/${screenId}/shows?from=${startDate}&to=${endDate}`,
    ),
  );
