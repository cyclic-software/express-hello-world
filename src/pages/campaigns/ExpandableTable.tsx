import React from 'react';
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';

import { DateFormat } from 'src/consts';
import { IOrdersResponse } from 'src/types/response';

import { CampaignRow } from './CampaignRow';

interface IExpandableTable {
  data?: IOrdersResponse;
  endDate: string;
  startDate: string;
  selectedPerPage: number;
  currentPage: number;
  currentSortingDirection: 'asc' | 'desc';
  currentSorting: string;
  onChangePerPage(value: number): void;
  handleSortChange(value: string): void;
  setCurrentPage(value: number): void;
  handleStartChange(value: string | null): void;
  handleEndChange(value: string | null): void;
}

export const ExpandableTable: React.FC<IExpandableTable> = ({
  data,
  selectedPerPage,
  onChangePerPage,
  currentPage,
  setCurrentPage,
  currentSorting,
  currentSortingDirection,
  handleSortChange,
  handleEndChange,
  handleStartChange,
  endDate,
  startDate,
}) => (
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
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ height: '100px' }}>
          <div style={{ padding: '10px' }}>
            <DesktopDatePicker
              className='dpLeft'
              inputFormat={DateFormat}
              label='Start Date'
              renderInput={(params) => <TextField {...params} />}
              value={startDate}
              onChange={(value) => {
                handleStartChange(format(value as any, DateFormat));
              }}
            />
            <DesktopDatePicker
              className='dpRight'
              inputFormat={DateFormat}
              label='End Date'
              minDate={startDate.toString()}
              renderInput={(params) => <TextField {...params} />}
              value={endDate}
              onChange={(value) => {
                handleEndChange(format(value as any, DateFormat));
              }}
            />
          </div>
        </LocalizationProvider>
      </div>
      <TablePagination
        className='dpRight'
        component='div'
        count={data?.amount ?? 0}
        page={currentPage}
        rowsPerPage={selectedPerPage}
        rowsPerPageOptions={[10, 25, 50, data?.amount ?? 0]}
        onPageChange={(_, page) => {
          setCurrentPage(page);
        }}
        onRowsPerPageChange={(e) => {
          onChangePerPage(+e.target.value);
        }}
      />
    </div>
    <TableContainer
      sx={{
        maxHeight: 'calc(100vh - 260px)',
      }}
    >
      <Table aria-label='collapsible table' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '40px', textAlign: 'center' }} /> {/* first row */}
            <TableCell>
              <b>Order ID</b> {/* second row */}
            </TableCell>
            <TableCell align='center'>
              <TableSortLabel
                active={currentSorting === 'noOfSchedules'}
                className='tHead'
                direction={currentSorting === 'noOfSchedules' ? currentSortingDirection : undefined}
                onClick={() => {
                  handleSortChange('noOfSchedules');
                }}
              >
                <b>
                  Schedule
                  <br /> Count
                </b>{' '}
                {/* third row */}
              </TableSortLabel>
            </TableCell>
            <TableCell align='right' sx={{ width: '150px', textAlign: 'center' }}>
              <b>
                Spots
                <br /> Available
              </b>{' '}
              {/* fourth row */}
            </TableCell>
            <TableCell align='right' sx={{ width: '150px', textAlign: 'center' }}>
              <b>
                Spots <br />
                Scheduled
              </b>{' '}
              {/* fifth row */}
            </TableCell>
            <TableCell align='right' sx={{ width: '150px', textAlign: 'center' }}>
              <b>
                Spots <br />
                Played
              </b>{' '}
              {/* sixth row */}
            </TableCell>
            <TableCell align='right' sx={{ textAlign: 'center' }}>
              <b>
                Played <br />
                Percent
              </b>{' '}
              {/* seventh row */}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.orders?.map((row) => (
            <CampaignRow key={row.id} row={row} />
          ))}
          {!data && (
            <LinearProgress sx={{ position: 'absolute', width: '1000px', marginLeft: '15%', marginTop: '50px' }} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);
