import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Breadcrumbs, LinearProgress, Link, Paper, Typography } from '@mui/material';

import { useShows } from 'src/api/shows';
import { useCampaingDateRangeContext } from 'src/contexts';
import { tableShowsColumnStructure } from 'src/srcNew/api/data';
import LocalizationWrapper from 'src/srcNew/components/header/LocalizationWrapper';
import TopContainer from 'src/srcNew/components/header/TopContainer';
import Table from 'src/srcNew/components/table/Table';

import 'src/pages/campaigns/campaigns.scss';

export const PageShowsNew: React.FC = () => {
  const { getShowsDateRange } = useCampaingDateRangeContext();

  const { endDate, handleChangeEndDate, handleChangeStartDate, startDate } = getShowsDateRange();

  const { orderId, scheduleId, screenId } = useParams() as { orderId: string; scheduleId: string; screenId: string };
  const { data, isLoading } = useShows(orderId, scheduleId, screenId, startDate, endDate);

  return (
    <>
      <div className='topContainer'>
        <TopContainer amount={data?.length} isLoading={isLoading} title='Shows' />
      </div>
      <div className='summaryCardContainer'>
        <Breadcrumbs>
          <Link component={RouterLink} to='/new-campaigns/'>
            Order: {orderId}
          </Link>
          <Link component={RouterLink} to={`/new-campaigns/${encodeURIComponent(orderId)}/`}>
            Schedule: {scheduleId}
          </Link>
          <Link component={RouterLink} to={`/new-campaigns/${encodeURIComponent(orderId)}/${scheduleId}`}>
            Screen: {data?.[0]?.screenName}
          </Link>
          <Typography>Shows</Typography>
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
            <Table tableColumnStructure={tableShowsColumnStructure} tableData={data} />
            {isLoading && (
              <LinearProgress sx={{ position: 'absolute', width: '1000px', marginLeft: '15%', marginTop: '50px' }} />
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
