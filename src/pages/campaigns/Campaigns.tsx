import React, { useState } from 'react';
import { Lens, LensOutlined } from '@mui/icons-material';

import { useCampaingDateRangeContext } from 'src/contexts';

import { useCampaingsOrders, useCampaingsSummary } from '../../api/campaigns';

import { ExpandableTable } from './ExpandableTable';

import './campaigns.scss';

export const Campaigns: React.FC = () => {
  const { getOrdersDateRange } = useCampaingDateRangeContext();

  const [selectedPerPage, setSelectedPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0); // Return on particullar page
  const [currentSorting, setCurrentSorting] = useState('orderId');
  const [currentSortingDirection, setCurrentSortingDirection] = useState<'asc' | 'desc'>('asc');

  const { endDate, startDate, handleChangeEndDate, handleChangeStartDate } = getOrdersDateRange();

  const { data: ordersResponse, isLoading } = useCampaingsOrders(currentPage + 1, startDate, endDate);

  const { data: summaryResponse } = useCampaingsSummary(startDate, endDate);

  const handleSortChange = (sortKey: 'asc' | 'desc') => {
    if (sortKey === currentSorting) {
      setCurrentSortingDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setCurrentSorting(sortKey);
      setCurrentSortingDirection('asc');
    }
  };

  return (
    <>
      <div className='topContainer'>
        <div className='topLeft'>
          <span className='pageTitle'>
            Campaigns <span className='titleCounter'>{isLoading ? 'Loading...' : ordersResponse?.amount}</span>
          </span>
        </div>
        <div className='topRight' />
      </div>
      <div className='summaryCardContainer'>
        <div className='summaryItem'>
          <Lens className='activeIcon' />
          <span className='itemCount'>{summaryResponse?.noOfActive}</span>
          <span className='itemLabel'>Active</span>
        </div>
        <div className='summaryItem'>
          <Lens className='pausedIcon' />
          <span className='itemCount'>{summaryResponse?.noOfLogsPending}</span>
          <span className='itemLabel'>Logs Pending</span>
        </div>
        <div className='summaryItem'>
          <Lens className='consumedIcon' />
          <span className='itemCount'>{summaryResponse?.noOfProblematic}</span>
          <span className='itemLabel'>Problematic</span>
        </div>
        <div className='summaryItem'>
          <Lens className='completedIcon' />
          <span className='itemCount'>{summaryResponse?.noOfCompleted}</span>
          <span className='itemLabel'>Completed</span>
        </div>
        <div className='summaryItem'>
          <Lens className='expiredIcon' />
          <span className='itemCount'>{summaryResponse?.noOfUnoptimized}</span>
          <span className='itemLabel'>Expired</span>
        </div>
        <div className='summaryItem'>
          <LensOutlined className='plannedIcon' />
          <span className='itemCount'>{summaryResponse?.noOfPlaned}</span>
          <span className='itemLabel'>Planned</span>
        </div>

        <div className='summaryItem'>
          <LensOutlined className='draftIcon' />
          <span className='itemCount'>{summaryResponse?.problematicPercent}</span>
          <span className='itemLabel'>Problematic %</span>
        </div>
      </div>
      <div className='campaignTableDeck'>
        <div className='campaignDataTable'>
          <ExpandableTable
            currentPage={currentPage}
            currentSorting={currentSorting}
            currentSortingDirection={currentSortingDirection}
            data={ordersResponse}
            endDate={endDate}
            handleEndChange={handleChangeEndDate as any}
            handleSortChange={handleSortChange}
            handleStartChange={handleChangeStartDate as any}
            selectedPerPage={selectedPerPage}
            setCurrentPage={setCurrentPage}
            startDate={startDate}
            onChangePerPage={setSelectedPerPage}
          />
        </div>
      </div>
    </>
  );
};
