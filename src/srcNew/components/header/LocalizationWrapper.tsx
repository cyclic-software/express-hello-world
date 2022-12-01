import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';

import { DateFormat } from 'src/consts';

interface ILocalization {
  startDate: any;
  endDate: any;
  handleChangeStartDate: any;
  handleChangeEndDate: any;
  disabledPagination: any;
}

const LocalizationWrapper: React.FC<ILocalization> = ({
  startDate,
  endDate,
  handleChangeStartDate,
  handleChangeEndDate,
  disabledPagination,
}) => (
  <div>
    <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ height: '100px' }}>
      <div style={{ padding: '10px' }}>
        <DesktopDatePicker
          className='dpLeft'
          disabled={!!disabledPagination}
          inputFormat={DateFormat}
          label='Start Date'
          renderInput={(params) => <TextField {...params} />}
          value={startDate}
          onChange={(value) => {
            handleChangeStartDate(format(value as any, DateFormat));
          }}
        />
        <DesktopDatePicker
          className='dpRight'
          disabled={!!disabledPagination}
          inputFormat={DateFormat}
          label='End Date'
          minDate={startDate.toString()}
          renderInput={(params) => <TextField {...params} />}
          value={endDate}
          onChange={(value) => {
            handleChangeEndDate(format(value as any, DateFormat));
          }}
        />
      </div>
    </LocalizationProvider>
  </div>
);

export default LocalizationWrapper;
