import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  LinearProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';

import { useShows } from 'src/api/shows';
import { DateFormat } from 'src/consts';
import { useCampaingDateRangeContext } from 'src/contexts';

import { Row } from './ShowsRow';

import './shows.scss';

export const ShowsPage: React.FC = () => {
  // const currentSortingDirection = 'asc';
  // const handleSortChange = (_: string) => {};
  // const currentSorting: string = 'orderId';

  const { getShowsDateRange } = useCampaingDateRangeContext();

  const { endDate, handleChangeEndDate, handleChangeStartDate, startDate } = getShowsDateRange();

  const { orderId, scheduleId, screenId } = useParams() as { orderId: string; scheduleId: string; screenId: string };
  const { data, isLoading } = useShows(orderId, scheduleId, screenId, startDate, endDate);

  return (
    <>
      <div className='topContainer'>
        <div className='topLeft'>
          <span className='pageTitle'>
            Shows <span className='titleCounter'>{isLoading ? 'Loading..' : data?.length}</span>
          </span>
        </div>
        <div className='topRight' />
      </div>
      <div className='summaryCardContainer'>
        <Breadcrumbs>
          <Link component={RouterLink} to='/campaigns/'>
            Order: {orderId}
          </Link>
          <Link component={RouterLink} to={`/campaigns/${encodeURIComponent(orderId)}/`}>
            Schedule: {scheduleId}
          </Link>
          <Link component={RouterLink} to={`/campaigns/${encodeURIComponent(orderId)}/${scheduleId}`}>
            Screen: {data?.[0]?.screenName}
          </Link>
          <Typography>Shows</Typography>
        </Breadcrumbs>
      </div>

      <Paper
        className='showsTableCard'
        sx={{
          width: '97%',
          overflow: 'hidden',
          maxHeight: 'calc(100vh - 260px)',
          marginLeft: '20px',
          borderRadius: '6px',
        }}
      >
        <div style={{ borderBottom: '2px solid rgb(217, 221, 226)' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ height: '100px' }}>
            <div style={{ padding: '10px' }}>
              <DesktopDatePicker
                className='dpLeft'
                inputFormat={DateFormat}
                label='Start Date'
                renderInput={(params) => <TextField {...params} />}
                value={startDate}
                disabled
                onChange={(value) => {
                  handleChangeStartDate(format(value as any, DateFormat));
                }}
              />
              <DesktopDatePicker
                className='dpRight'
                inputFormat={DateFormat}
                label='End Date'
                minDate={startDate.toString()}
                renderInput={(params) => <TextField {...params} />}
                value={endDate}
                disabled
                onChange={(value) => {
                  handleChangeEndDate(format(value as any, DateFormat));
                }}
              />
            </div>
          </LocalizationProvider>
        </div>
        <TableContainer
          sx={{
            maxHeight: 'calc(100vh - 260px)',
          }}
        >
          <Table aria-label='collapsible table' stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell /> {/* first */}
                <TableCell>
                  <b>Date</b> {/* second */}
                </TableCell>
                <TableCell sx={{ width: '300px' }}>
                  <b>Show Day</b> {/* third */}
                </TableCell>
                <TableCell align='right' className='tHead' sx={{ width: '300px' }}>
                  <b>Start/End Time</b> {/* fourth */}
                </TableCell>
                <TableCell align='right' className='tHead' sx={{ width: '300px' }}>
                  <b>Position</b> {/* fifth */}
                </TableCell>
                <TableCell align='right' className='tHead' sx={{ width: '300px' }}>
                  <b>PrefPosition</b> {/* sixth */}
                </TableCell>
                <TableCell align='right' className='tHead' sx={{ width: '300px' }}>
                  <b>Spots</b> {/* seventh */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <Row key={row.id} row={row} />
              ))}
              {isLoading && (
                <LinearProgress sx={{ position: 'absolute', width: '1000px', marginLeft: '15%', marginTop: '50px' }} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
