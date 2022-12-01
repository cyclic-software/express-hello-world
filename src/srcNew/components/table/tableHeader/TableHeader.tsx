import React from 'react';

import TableRowHeader from 'src/srcNew/components/table/tableHeader/TableRowHeader';
import { IOrderColumnStructure } from 'src/srcNew/types/ordersDataTypes';

interface ITable {
  tableColumnStructure: IOrderColumnStructure[];
}

const TableHeader: React.FC<ITable> = ({ tableColumnStructure }) => {
  return (
    <thead>
      <TableRowHeader tableColumnStructure={tableColumnStructure} />
    </thead>
  );
};

export default TableHeader;
