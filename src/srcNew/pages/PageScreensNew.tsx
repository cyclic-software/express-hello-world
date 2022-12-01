import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Breadcrumbs, LinearProgress, Link, Paper, Typography } from '@mui/material';

import { useSchedules } from 'src/api/screens';
import { useCampaingDateRangeContext } from 'src/contexts';
import { tableScreensColumnStructure } from 'src/srcNew/api/data';
import LocalizationWrapper from 'src/srcNew/components/header/LocalizationWrapper';
import TopContainer from 'src/srcNew/components/header/TopContainer';
import Table from 'src/srcNew/components/table/Table';

import 'src/pages/campaigns/campaigns.scss';

export const PageScreensNew: React.FC = () => {
  const { getScreensDateRange } = useCampaingDateRangeContext();

  const { endDate, handleChangeEndDate, handleChangeStartDate, startDate } = getScreensDateRange();

  const { orderId, scheduleId } = useParams() as { orderId: string; scheduleId: string };
  const { data, isLoading } = useSchedules(orderId, scheduleId, startDate, endDate);

  return (
    <>
      <div className='topContainer'>
        <TopContainer amount={data?.length} isLoading={isLoading} title='Screens' />
      </div>
      <div className='summaryCardContainer'>
        <Breadcrumbs>
          <Link component={RouterLink} to='/new-campaigns/'>
            Order: {orderId}
          </Link>
          <Link component={RouterLink} to={`/new-campaigns/${encodeURIComponent(orderId)}/`}>
            Schedule: {scheduleId}
          </Link>
          <Typography>Screens</Typography>
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
            <Table tableColumnStructure={tableScreensColumnStructure} tableData={data} />
            {isLoading && (
              <LinearProgress sx={{ position: 'absolute', width: '1000px', marginLeft: '15%', marginTop: '50px' }} />
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
