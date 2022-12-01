import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';

// import { DateFormat } from 'src/consts';
import { ISchedule } from 'src/types';

interface IScheduleRowProps {
  row: ISchedule;
}

export const ScheduleRow: React.FC<IScheduleRowProps> = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />} {/* first */}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' sx={{ textAlign: 'left', width: 200 }}>
          <Typography className='tHead' sx={{ my: -5, lineHeight: 1 }}>
            <Link to={encodeURIComponent(row.scheduleId)}>
              <p>{row.name}</p>
            </Link>
            <p style={{ color: 'gray' }}>Schedule ID: {row.scheduleId}</p> {/* second */}
          </Typography>
        </TableCell>
        <TableCell align='right' component='th' scope='row' sx={{ textAlign: 'center' }}>
          <Typography className='tHead' sx={{ my: -4 }}>
            {row.noOfScreens} {/* Third */}
          </Typography>
        </TableCell>
        <TableCell align='right' sx={{ alignItems: 'center' }}>
          <Typography sx={{ marginRight: 7, my: -5, lineHeight: 0.8 }}>
            <div>
              <p className='tHead'>Taken: {row.totalTaken}</p>
              {/* fourth */}
              <p className='tHead'>Not Taken: {row.totalNotTaken}</p>
            </div>
          </Typography>
        </TableCell>{' '}
        <TableCell align='right' sx={{ width: '150px', alignItems: 'center' }}>
          <Typography sx={{ marginRight: 6, my: -5, lineHeight: 0.8 }}>
            <p className='tHead'>Played: {row.totalPlayed}</p>
            <p className='tHead'>Not Played: {row.totalNotPlayed}</p>

            {/* fifth */}
          </Typography>
        </TableCell>
        <TableCell align='right' sx={{ width: '150px', alignItems: 'center', height: 50 }}>
          <Typography sx={{ marginRight: 5, my: -5.6, pt: 1, pb: 1, lineHeight: 0.8 }}>
            <p className='tHead'>Available: {row.spotsAvailable}</p>
            <p className='tHead'>Scheduled: {row.spotsScheduled}</p>
            <p className='tHead'>Played: {row.spotsPlayed}</p>

            {/* sixth */}
          </Typography>
        </TableCell>
        <TableCell align='right' sx={{ width: '150px', textAlign: 'center' }}>
          <Typography className='tHead' sx={{ my: -4 }}>
            {row.takenPercent}
            {/* seventh */}
          </Typography>
        </TableCell>
        <TableCell align='right' sx={{ textAlign: 'center' }}>
          <Typography className='tHead' sx={{ my: -4 }}>
            {row.playedPercent}
          </Typography>{' '}
          {/* eight */}
        </TableCell>{' '}
        <TableCell align='right'>
          <Typography className='tHead' sx={{ textAlign: 'center', my: -4 }}>
            {row.spotsPlayedPercent}
          </Typography>
          {/* ninth */}
        </TableCell>{' '}
      </TableRow>
      <TableRow>
        <TableCell colSpan={9} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ paddingLeft: '50px' }}>
              <Table aria-label='purchases' size='small'>
                {/* <TableHead>
                  <TableRow>
                    <TableCell size='small' />
                    <TableCell size='small' />
                    <TableCell size='small' />
                    <TableCell align='right' size='small' />
                  </TableRow>
                </TableHead> */}
                <TableBody sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow sx={{ padding: 0 }}>
                    <TableCell component='th' scope='row' size='small'>
                      <Typography className='tHead' sx={{ lineHeight: 0.8 }}>
                        <i>
                          <p>Created On: {format(parseISO(row.createdOn), 'dd-MMM-yy KK:mm:ss b')}</p>
                        </i>
                        <i>
                          <p>{row.composition}</p>
                        </i>
                      </Typography>
                    </TableCell>
                    <TableCell size='small'>
                      <Typography className='tHead' sx={{ lineHeight: 0.8 }}>
                        <i>
                          <p>Schedule Start: {format(parseISO(row.startDate), 'yyyy-MMM-dd')}</p>
                        </i>
                        <i>
                          <p>Position: {row.position}</p>
                        </i>
                      </Typography>
                    </TableCell>
                    <TableCell size='small'>
                      <Typography className='tHead' sx={{ lineHeight: 0.8 }}>
                        <p>
                          <i>Schedule End: {format(parseISO(row.endDate), 'yyyy-MMM-dd')} </i>
                        </p>
                        <p>
                          <i>Preferential Position: {row.prefPosition}</i>
                        </p>
                      </Typography>
                    </TableCell>
                    <TableCell align='right' size='small'>
                      <Typography className='tHead' sx={{ lineHeight: 0.8, mr: 60, my: -2 }}>
                        <i>Repetition: {row.spotRepetition} </i>
                      </Typography>
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
