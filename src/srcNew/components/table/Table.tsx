import React from 'react';

import { IOrder, IOrderColumnStructure, ISchedulesResponse } from 'src/srcNew/types/ordersDataTypes';
import { ISchedule } from 'src/types';
import { IScreensResponse, IShowsResponse } from 'src/types/response';

import TableBody from './tableBody/TableBody';
import TableHeader from './tableHeader/TableHeader';

import './Table.css';

interface IExpandableTable {
  tableData?: ISchedulesResponse | IOrder[] | IScreensResponse | IShowsResponse | ISchedule[];
  tableColumnStructure: IOrderColumnStructure[];
}

const Table: React.FC<IExpandableTable> = ({ tableData, tableColumnStructure }) => (
  <div className='table-wrapper'>
    <table className='table'>
      <TableHeader tableColumnStructure={tableColumnStructure} />
      <TableBody tableColumnStructure={tableColumnStructure} tableData={tableData} />
    </table>
  </div>
);

export default Table;
