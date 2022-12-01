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

import { useSchedules } from 'src/api/screens';
import { DateFormat } from 'src/consts';
import { useCampaingDateRangeContext } from 'src/contexts';

import { Row } from './ScreenRow';

import './screens.scss';

export const ShowScreens: React.FC = () => {
  // const currentSortingDirection = 'asc';
  // const handleSortChange = (_: string) => {};
  // const currentSorting: string = 'orderId';
  const { getScreensDateRange } = useCampaingDateRangeContext();

  const { endDate, handleChangeEndDate, handleChangeStartDate, startDate } = getScreensDateRange();

  const { orderId, scheduleId } = useParams() as { orderId: string; scheduleId: string };
  const { data, isLoading } = useSchedules(orderId, scheduleId, startDate, endDate);

  return (
    <>
      <div className='topContainer'>
        <div className='topLeft'>
          <span className='pageTitle'>
            Screens <span className='titleCounter'>{isLoading ? 'Loading..' : data?.length}</span>
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
          <Typography>Screens</Typography>
        </Breadcrumbs>
      </div>

      <Paper
        className='screenTableCard'
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
                  <b>Screen Code</b> {/* second */}
                </TableCell>
                <TableCell>
                  <b>Screen Name</b> {/* third */}
                </TableCell>
                <TableCell align='right' className='tHead' sx={{ width: '300px' }}>
                  <b>Theatre/Location</b> {/* fourth */}
                </TableCell>
                <TableCell align='right' className='tHead' sx={{ width: '150px' }}>
                  <b>Taken On</b> {/* fifth */}
                </TableCell>
                <TableCell align='right' className='tHead' sx={{ width: '150px' }}>
                  <b>Taken On</b> {/* sixth  */}
                </TableCell>
                <TableCell align='right' className='tHead' sx={{ width: '150px' }}>
                  <b>Play Log Status</b> {/* seventh */}
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
