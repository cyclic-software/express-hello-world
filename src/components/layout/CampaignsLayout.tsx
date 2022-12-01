import React from 'react';
import { Outlet } from 'react-router-dom';

import { CampaignDateRangeProvider } from 'src/contexts/campaignDateRange';

import { Sidebar } from '../Sidebar';

import './layoutStyles.scss';

export const CampaignsLayout: React.FC = () => (
  <div className='container'>
    <Sidebar />
    <div className='campaignContainer'>
      <CampaignDateRangeProvider>
        <Outlet />
      </CampaignDateRangeProvider>
    </div>
  </div>
);
