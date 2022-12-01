import { useQuery } from '@tanstack/react-query';

import { BaseApiURL } from 'src/consts';
import { IOrdersResponse, IOrdersSummaryResponse } from 'src/types/response';

import { queryFactory } from '../helper';

export const useCampaingsOrders = (currentPage: number, startDate: string, endDate: string) =>
  useQuery<IOrdersResponse>(
    ['campaingsOrders', currentPage, startDate, endDate],
    queryFactory(`${BaseApiURL}/orders/page/${currentPage + 1}?from=${startDate}&to=${endDate}`),
  );

export const useCampaingsSummary = (startDate: string, endDate: string) =>
  useQuery<IOrdersSummaryResponse>(
    ['campaingsSummary', startDate, endDate],
    queryFactory(`${BaseApiURL}/orders/summary/?from=${startDate}&to=${endDate}`),
  );
