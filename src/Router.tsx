import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CampaignsLayout } from 'src/components/layout/CampaignsLayout';
import { Campaigns, ShowSchedules, ShowScreens, ShowsPage } from 'src/pages';
import { CampaignsLayoutNew } from 'src/srcNew/pages/CampaignsLayoutNew';
import { PageCampaignsNew } from 'src/srcNew/pages/PageCampaignsNew';
import { PageSchedulesNew } from 'src/srcNew/pages/PageSchedulesNew';
import { PageScreensNew } from 'src/srcNew/pages/PageScreensNew';
import { PageShowsNew } from 'src/srcNew/pages/PageShowsNew';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<div>200</div>} path='/ping' />
      <Route path='/'>
        <Route element={<Navigate to='/campaigns' />} index />
        <Route element={<CampaignsLayoutNew />} path='new-campaigns'>
          <Route element={<PageCampaignsNew />} index />
          <Route element={<PageSchedulesNew />} path=':orderId' />
          <Route element={<PageScreensNew />} path=':orderId/:scheduleId' />
          <Route element={<PageShowsNew />} path=':orderId/:scheduleId/:screenId' />
        </Route>
        <Route element={<CampaignsLayout />} path='campaigns'>
          <Route element={<Campaigns />} index />
          <Route element={<ShowSchedules />} path=':orderId' />
          <Route element={<ShowScreens />} path=':orderId/:scheduleId' />
          <Route element={<ShowsPage />} path=':orderId/:scheduleId/:screenId' />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
