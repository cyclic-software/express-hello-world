import React from 'react';

interface IExpandableTable {
  visible: boolean;
  label: string;
  width: number;
  minWidth: number;
}
const TableColumnHeader: React.FC<IExpandableTable> = ({ visible, label, width, minWidth }) => {
  const column = (
    <th className='th_column' style={{ width: `${width}%`, minWidth: `${minWidth}px` }}>
      {label}
    </th>
  );

  return <>{visible && column}</>;
};

export default TableColumnHeader;
