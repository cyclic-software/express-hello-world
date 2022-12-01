import React from 'react';

import TableColumnHeader from 'src/srcNew/components/table/tableHeader/TableColumnHeader';
import { IOrderColumnStructure } from 'src/srcNew/types/ordersDataTypes';

interface ITable {
  tableColumnStructure: IOrderColumnStructure[];
}

const TableRowHeader: React.FC<ITable> = ({ tableColumnStructure }) => {
  const columns = tableColumnStructure?.map((item: IOrderColumnStructure) => (
    <TableColumnHeader
      key={item.col_name}
      label={item.col_label}
      minWidth={item.col_minWidth}
      visible={item.col_visible}
      width={item.col_width}
    />
  ));

  return <tr>{columns}</tr>;
};

export default TableRowHeader;
