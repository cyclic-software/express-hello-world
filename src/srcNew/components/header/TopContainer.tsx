import React from 'react';

interface IExpandableTable {
  isLoading: boolean;
  amount?: number;
  title: string;
}

const TopContainer: React.FC<IExpandableTable> = ({ isLoading, amount, title }) => (
  <div className='topContainer'>
    <div className='topLeft'>
      <span className='pageTitle'>
        {title} <span className='titleCounter'>{isLoading ? 'Loading...' : amount}</span>
      </span>
    </div>
    <div className='topRight' />
  </div>
);

export default TopContainer;
