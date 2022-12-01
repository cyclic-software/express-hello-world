import React from 'react';

interface IExpandableTable {
  label: string;
  subLabel: string;
}

const TableColumn: React.FC<IExpandableTable> = ({ label, subLabel }) => {
  let columnValue;

  if (subLabel !== '' && subLabel !== undefined) {
    columnValue = (
      <td className='innerColumnRow'>
        <div>{label}</div>
        <div>{subLabel}</div>
      </td>
    );
  } else {
    columnValue = <td> {label} </td>;
  }

  return columnValue;
};

export default TableColumn;
