import React from 'react';
// import AssessmentIcon from "@mui/icons-material/Assessment";
import { Link } from 'react-router-dom';
import { Campaign } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import StorageIcon from '@mui/icons-material/Storage';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { Routes } from 'src/consts';
import logo from 'src/media/qubeslate_min.png';

import './sidebar.scss';

export const Sidebar: React.FC = () => (
  <div className='sidebar'>
    <div className='top'>
      <img alt='qubeslate logo' src={logo} width='50px' />
    </div>
    <hr color='#8F9EB2' />
    <div className='center'>
      <ul>
        <Link className='menuLink' to='/'>
          <li>
            <DashboardIcon />
            <span>Overview</span>
          </li>
        </Link>
      </ul>
      <ul>
        <Link className='menuLink' to='/'>
          <li>
            <FactCheckIcon />
            <span>Approvals</span>
          </li>
        </Link>
      </ul>
      <ul style={{ backgroundColor: '#2d3540', borderLeft: '#F5F8FA solid 5px' }}>
        <Link className='menuLink' style={{ borderLeft: '#F5F8FA 5px' }} to={Routes.Campaigns}>
          <li>
            <Campaign />
            <span>Campaigns</span>
          </li>
        </Link>
      </ul>
      <ul>
        <Link className='menuLink' to='/'>
          <li>
            <SmartDisplayIcon />
            <span>Content</span>
          </li>
        </Link>
      </ul>
      <ul>
        <Link className='menuLink' to='/'>
          <li>
            <BusinessIcon />
            <span>Companies</span>
          </li>
        </Link>
      </ul>
      <ul>
        <Link className='menuLink' to='/'>
          <li>
            <StorageIcon />
            <span>Inventory</span>
          </li>
        </Link>
      </ul>
      <ul>
        <Link className='menuLink' to='/'>
          <li>
            <FolderCopyIcon />
            <span>Catalogue</span>
          </li>
        </Link>
      </ul>
      <ul>
        <Link className='menuLink' to='/'>
          <li>
            <ArticleIcon />
            <span>Play Logs</span>
          </li>
        </Link>
      </ul>
      <ul>
        <Link className='menuLink' to='/'>
          <li>
            <SummarizeIcon />
            <span>Reports</span>
          </li>
        </Link>
      </ul>
      <ul>
        <Link className='menuLink' to='/'>
          <li>
            <FormatListBulletedIcon />
            <span>Lists</span>
          </li>
        </Link>
      </ul>
    </div>
  </div>
);

export default Sidebar;
