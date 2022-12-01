import React, { useState } from 'react';
import { LinearProgress, Paper, TablePagination } from '@mui/material';

import { useCampaingsOrders, useCampaingsSummary } from 'src/api/campaigns';
import { useCampaingDateRangeContext } from 'src/contexts';
import { summeryCardStructure, tableOrderColumnStructure } from 'src/srcNew/api/data';
import LocalizationWrapper from 'src/srcNew/components/header/LocalizationWrapper';
import SummaryCard from 'src/srcNew/components/header/SummaryCard';
import TopContainer from 'src/srcNew/components/header/TopContainer';
import Table from 'src/srcNew/components/table/Table';

import 'src/pages/campaigns/campaigns.scss';

export const PageCampaignsNew: React.FC = () => {
  const { getOrdersDateRange } = useCampaingDateRangeContext();
  const [selectedPerPage, setSelectedPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(0);
  const { endDate, startDate, handleChangeEndDate, handleChangeStartDate } = getOrdersDateRange();

  const { data: ordersResponse, isLoading } = useCampaingsOrders(currentPage + 1, startDate, endDate);
  const { data: summaryResponse } = useCampaingsSummary(startDate, endDate);

  return (
    <>
      <div className='topContainer'>
        <TopContainer amount={ordersResponse?.amount} isLoading={isLoading} title='Campaigns' />
      </div>
      <div className='summaryCardContainer'>
        <SummaryCard summaryCardStructure={summeryCardStructure} summaryResponse={summaryResponse} />
      </div>
      <div className='campaignTableDeck'>
        <div className='campaignDataTable'>
          <Paper
            sx={{
              width: '100%',
              overflow: 'hidden',
              maxHeight: 'calc(100vh - 250px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '2px solid rgb(217, 221, 226)',
              }}
            >
              <LocalizationWrapper
                disabledPagination={false}
                endDate={endDate}
                handleChangeEndDate={handleChangeEndDate}
                handleChangeStartDate={handleChangeStartDate}
                startDate={startDate}
              />
              <TablePagination
                className='dpRight'
                component='div'
                count={ordersResponse?.amount ?? 0}
                page={currentPage}
                rowsPerPage={selectedPerPage}
                rowsPerPageOptions={[10, 25, 50, ordersResponse?.amount ?? 0]}
                onPageChange={(_, page) => {
                  setCurrentPage(page);
                }}
                onRowsPerPageChange={(e) => {
                  setSelectedPerPage(+e.target.value);
                }}
              />
            </div>
            <Table tableColumnStructure={tableOrderColumnStructure} tableData={ordersResponse?.orders} />
            {isLoading && (
              <LinearProgress sx={{ position: 'absolute', width: '1000px', marginLeft: '15%', marginTop: '50px' }} />
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
