import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Breadcrumbs, LinearProgress, Link, Paper, Typography } from '@mui/material';

import { useSchedules } from 'src/api/schedules';
import { useCampaingDateRangeContext } from 'src/contexts';
import { tableSchedulesColumnStructure } from 'src/srcNew/api/data';
import LocalizationWrapper from 'src/srcNew/components/header/LocalizationWrapper';
import TopContainer from 'src/srcNew/components/header/TopContainer';
import Table from 'src/srcNew/components/table/Table';

import 'src/pages/campaigns/campaigns.scss';

export const PageSchedulesNew: React.FC = () => {
  const { getSchedulesDateRange } = useCampaingDateRangeContext();

  const { endDate, handleChangeEndDate, handleChangeStartDate, startDate } = getSchedulesDateRange();

  const { orderId } = useParams() as { orderId: string };
  const { data, isLoading } = useSchedules(orderId, startDate, endDate);

  return (
    <>
      <div className='topContainer'>
        <TopContainer amount={data?.length} isLoading={isLoading} title='Schedules' />
      </div>
      <div className='summaryCardContainer'>
        <Breadcrumbs>
          <Link component={RouterLink} to='/new-campaigns/'>
            Order: {orderId}
          </Link>
          <Typography>Schedules</Typography>
        </Breadcrumbs>
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
                endDate={endDate}
                handleChangeEndDate={handleChangeEndDate}
                handleChangeStartDate={handleChangeStartDate}
                startDate={startDate}
                disabledPagination
              />
            </div>
            <Table tableColumnStructure={tableSchedulesColumnStructure} tableData={data} />
            {isLoading && (
              <LinearProgress sx={{ position: 'absolute', width: '1000px', marginLeft: '15%', marginTop: '50px' }} />
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
