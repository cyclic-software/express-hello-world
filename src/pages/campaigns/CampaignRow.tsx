import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { format, parseISO } from 'date-fns';

import { DateFormat } from 'src/consts';
import { IOrder } from 'src/types/orders';

interface ICampaignRowProps {
  row: IOrder;
}

export const CampaignRow: React.FC<ICampaignRowProps> = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />} {/* first row */}
          </IconButton>
        </TableCell>
        <TableCell className='tHeadOrder' component='th' scope='row'>
          <Link style={{ textDecoration: 'none' }} to={`/campaigns/${encodeURIComponent(row.orderId)}`}>
            {row.orderId} {/* second row */}
          </Link>
        </TableCell>
        <TableCell align='right' className='tHead'>
          {row.noOfSchedules} {/* third row */}
        </TableCell>
        <TableCell align='right' className='tHead' sx={{ width: '150px' }}>
          {row.spotsAvailable} {/* fourth row */}
        </TableCell>
        <TableCell align='right' className='tHead' sx={{ width: '150px' }}>
          {row.spotsScheduled} {/* fifth row */}
        </TableCell>
        <TableCell align='right' className='tHead'>
          {row.spotsPlayed} {/* sixth row */}
        </TableCell>{' '}
        <TableCell align='right' className='tHead'>
          {row.playedPercent} %{/* seventh row */}
        </TableCell>{' '}
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ paddingLeft: '50px' }}>
              <Table aria-label='purchases' size='small'>
                {/* <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell align='right' />
                  </TableRow>
                </TableHead> */}
                <TableBody sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell component='th' scope='row' sx={{ width: '30%' }}>
                      <i>Minimum Schedule Date: {format(parseISO(row.startDate), DateFormat)}</i>
                    </TableCell>
                    <TableCell sx={{ width: '30%' }}>
                      {' '}
                      <i>Maximum Schedule Date: {format(parseISO(row.endDate), DateFormat)}</i>
                    </TableCell>
                    <TableCell align='right' sx={{ textAlign: 'left' }}>
                      {/* {(row.startDate - row.endDate)/row.startDate} % */} <i>% Complete: 22%</i>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
