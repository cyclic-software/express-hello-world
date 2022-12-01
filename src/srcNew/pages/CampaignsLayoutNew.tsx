import React from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from 'src/components/Sidebar';
import { CampaignDateRangeProvider } from 'src/contexts/campaignDateRange';

import 'src/pages/campaigns/campaigns.scss';

export const CampaignsLayoutNew: React.FC = () => (
  <div className='container'>
    <Sidebar />
    <div className='campaignContainer'>
      <CampaignDateRangeProvider>
        <Outlet />
      </CampaignDateRangeProvider>
    </div>
  </div>
);
