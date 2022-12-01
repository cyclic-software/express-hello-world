import React, { useState } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';

import { IShow } from 'src/types';

export const ShowsRow: React.FC = () => <div>ShowsRow</div>;

interface IScreenRowProps {
  row: IShow;
}

export const Row: React.FC<IScreenRowProps> = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} first */}
          </IconButton>
        </TableCell>

        <TableCell className='tHead'>
          {row.showDate} {/* second */}
        </TableCell>
        <TableCell className='tHead'>
          {row.day} {/* third */}
        </TableCell>
        <TableCell align='right' className='tHead'>
          <div>
            <p>Start: {row.startTime}</p>
            <p>End: {row.endTime}</p>
          </div>
          {/* fourth */}
        </TableCell>
        <TableCell align='right' className='tHead'>
          {row.position}
          {/* fifth */}
        </TableCell>
        <TableCell align='right' className='tHead'>
          {row.prefPosition}
          {/* sixth */}
        </TableCell>
        <TableCell align='right' className='tHead'>
          <div>
            <p className='tHead'>Played: {row.spotsPlayed}</p>
            <p className='tHead'>Scheduled: {row.spotsScheduled}</p>
          </div>
          {/* seventh */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          {/*  */}
          {/*  */}
          {/* <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography component='div' variant='h6' gutterBottom>
                Screen Details
              </Typography>
              <Table aria-label='purchases' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Last Called/Played On</TableCell>
                    <TableCell>Spots</TableCell>
                    <TableCell>Played %</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {format(parseISO(row.lastCalledOn), DateFormat)}
                      <b>/</b>
                      {format(parseISO(row.lastPlayedOn), DateFormat)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>Available: {row.spotsAvailable}</p>
                        <p>Scheduled: {row.spotsScheduled}</p>
                        <p>Played: {row.spotsPlayed}</p>
                      </div>
                    </TableCell>
                    <TableCell>{row.playedPercent}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse> */}
          {/*  */}
          {/*  */}
        </TableCell>
      </TableRow>
    </>
  );
};
