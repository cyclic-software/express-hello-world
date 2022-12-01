import React from 'react';

import TableColumn from './TableColumn';

interface IExpandableTable {
  row: string[][];
}

const TableRow: React.FC<IExpandableTable> = ({ row }) => {
  const columns = row?.map((item, i: number) => <TableColumn key={i} label={item[0]} subLabel={item[1]} />);

  return <tr>{columns}</tr>;
};

export default TableRow;
