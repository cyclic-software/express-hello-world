import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { format, parseISO } from 'date-fns';

import { DateFormat } from 'src/consts';
import { IScreen } from 'src/types';

interface IScreenRowProps {
  row: IScreen;
}

export const Row: React.FC<IScreenRowProps> = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} {/* first */}
          </IconButton>
        </TableCell>

        <TableCell className='tHead'>
          <Link to={encodeURIComponent(row.screenId)}>
            {row.screenCode} {/* second */}
          </Link>
        </TableCell>
        <TableCell className='tHead'>
          {row.screen} {/* third */}
        </TableCell>
        <TableCell align='right'>
          <div>
            <p className='tHead'>City: {row.city}</p>
            <p className='tHead'>State: {row.state}</p>
            <p className='tHead'>Country: {row.country}</p>
            <p className='tHead'>Theatre: {row.theatre}</p>
          </div>{' '}
          {/* fourth */}
        </TableCell>
        <TableCell align='right' className='tHead'>
          {row.scheduleStatus} {/* fifth */}
        </TableCell>
        <TableCell align='right' className='tHead'>
          {format(parseISO(row.takenOn), DateFormat)} {/* sixth */}
        </TableCell>
        <TableCell align='right' className='tHead'>
          {row.playLogStatus} {/* seventh */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className='tHead' colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          {/*  */}
          {/*  */}
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table aria-label='purchases' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell>
                      <i>
                        <p>Last Called On: {format(parseISO(row.lastCalledOn), DateFormat)}</p>
                      </i>

                      <i>
                        <p>Last Played On: {format(parseISO(row.lastPlayedOn), DateFormat)}</p>
                      </i>
                    </TableCell>
                    <TableCell>
                      <i>
                        <p>Spots Available: {row.spotsAvailable}</p>
                      </i>
                      <i>
                        <p>Spots Scheduled: {row.spotsScheduled}</p>
                      </i>
                      <i>
                        <p>Spots Played: {row.spotsPlayed}</p>
                      </i>
                    </TableCell>
                    <TableCell>
                      <i>
                        <p>Played Percent: {row.playedPercent}%</p>
                      </i>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
          {/*  */}
          {/*  */}
        </TableCell>
      </TableRow>
    </>
  );
};
