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

import { useSchedules } from 'src/api/schedules';
import { DateFormat } from 'src/consts';
import { useCampaingDateRangeContext } from 'src/contexts';

import { ScheduleRow } from './ScheduleRow';

import './schedules.scss';
import './showCampaigns.scss';

export const ShowSchedules: React.FC = () => {
  // const currentSortingDirection = 'asc';
  // const handleSortChange = (_: string) => {};
  // const currentSorting: string = 'orderId';

  const { getSchedulesDateRange } = useCampaingDateRangeContext();

  const { endDate, handleChangeEndDate, handleChangeStartDate, startDate } = getSchedulesDateRange();

  const { orderId } = useParams() as { orderId: string };
  const { data, isLoading } = useSchedules(orderId, startDate, endDate);

  return (
    <>
      <div className='topContainer'>
        <div className='topLeft'>
          <span className='pageTitle'>
            Schedules <span className='titleCounter'>{isLoading ? 'Loading..' : data?.length}</span>
          </span>
        </div>
        <div className='topRight' />
      </div>
      <div className='summaryCardContainer'>
        <Breadcrumbs>
          <Link component={RouterLink} to='/campaigns/'>
            Order: {orderId}
          </Link>
          <Typography>Schedules</Typography>
        </Breadcrumbs>
      </div>
      <Paper
        className='schTableCard'
        sx={{
          overflow: 'hidden',
          maxHeight: 'calc(100vh - 260px)',
          marginLeft: '20px',
          marginRight: '20px',
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
                <TableCell sx={{ width: '40px' }} /> {/* first */}
                <TableCell sx={{ textAlign: 'left', width: 200 }}>
                  <b>Schedule Name</b> {/* second */}
                </TableCell>
                <TableCell align='right' sx={{ textAlign: 'center' }}>
                  <b>
                    Screen <br />
                    Count
                  </b>{' '}
                  {/* third */}
                </TableCell>
                <TableCell align='right' sx={{ width: '150px', textAlign: 'center' }}>
                  <b>
                    Taken <br /> Count
                  </b>{' '}
                  {/* fourth */}
                </TableCell>
                <TableCell align='right' sx={{ width: '150px', textAlign: 'center' }}>
                  <b>
                    Played <br /> Count
                  </b>{' '}
                  {/* fifth  */}
                </TableCell>
                <TableCell align='right' sx={{ width: '150px', textAlign: 'center' }}>
                  <b>
                    Spots <br />
                    Count
                  </b>{' '}
                  {/* sixth */}
                </TableCell>
                <TableCell align='right' sx={{ width: '150px', textAlign: 'center' }}>
                  <b>
                    Taken
                    <br /> Percent
                  </b>{' '}
                  {/* seventh */}
                </TableCell>
                <TableCell align='right' sx={{ textAlign: 'center' }}>
                  <b>
                    Played
                    <br /> Percent
                  </b>{' '}
                  {/* eight */}
                </TableCell>
                <TableCell align='right' sx={{ textAlign: 'center' }}>
                  <b>
                    Spots
                    <br /> Percent
                  </b>{' '}
                  {/* ninth */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <ScheduleRow key={row.scheduleId} row={row} />
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
