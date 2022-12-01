import React from 'react';

import { IOrder, IOrderColumnStructure, ISchedulesResponse } from 'src/srcNew/types/ordersDataTypes';
import { IShow } from 'src/types';
import { IScreensResponse, IShowsResponse } from 'src/types/response';

import getValueFunction from '../../../store/table-valueFunctions';

import TableRow from './TableRow';

interface IExpandableTable {
  tableColumnStructure: IOrderColumnStructure[];
  tableData?: IOrder[] | ISchedulesResponse | IScreensResponse | IShowsResponse;
}

const TableBody: React.FC<IExpandableTable> = ({ tableColumnStructure, tableData }) => {
  const rowsDataList: string[][][] | undefined | IOrder | IShow | any = tableData?.map((tableDataItem: any) => {
    const totalCellValue: string[][] = [];

    tableColumnStructure.forEach((columnStructure) => {
      const dataColValue = columnStructure.col_value;
      const dataColSubValue = columnStructure.col_subValue;

      if (columnStructure.col_visible) {
        totalCellValue.push([
          getValueFunction(dataColValue, tableDataItem),
          getValueFunction(dataColSubValue, tableDataItem),
        ]);
      }
    });

    return totalCellValue;
  });

  const rows = rowsDataList?.map((row: any, i: any) => <TableRow key={i} row={row} />);

  return <tbody>{rows}</tbody>;
};

export default TableBody;
