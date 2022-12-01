import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import { DateFormat } from 'src/consts';

function fnStringValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = dataObj[value];
    } else {
      result = '';
    }
  });

  return result;
}

function fnLinkOrderIDValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = (
        <Link style={{ textDecoration: 'none' }} to={`/new-campaigns/${encodeURIComponent(dataObj[value])}`}>
          {dataObj[value]}
        </Link>
      );
    } else {
      result = '';
    }
  });

  return result;
}

function fnNotTakenCountValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `Not Taken: ${dataObj[value]}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnTakenCountValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `Taken: ${dataObj[value]}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnScheduleNameValue(dataObj: any, argList: string[]) {
  let result;
  const scheduleId = dataObj[argList[0]] || '';
  const name = dataObj[argList[1]] || '';

  if (scheduleId !== '' && name !== '') {
    result = (
      <Link to={encodeURIComponent(scheduleId)}>
        <p>{name}</p>
      </Link>
    );
  } else if (scheduleId !== '' && name === '') {
    result = (
      <Link to={encodeURIComponent(scheduleId)}>
        <p style={{ color: 'gray' }}>Schedule ID: {scheduleId}</p>
      </Link>
    );
  } else if (scheduleId === '' && name !== '') {
    result = <p>{name}</p>;
  } else {
    result = '';
  }

  return result;
}

function fnScreenNameValue(dataObj: any, argList: string[]) {
  let result;
  const screen = dataObj[argList[0]] || '';
  const screenId = dataObj[argList[1]] || '';

  if (screenId !== '' && screen !== '') {
    result = <Link to={encodeURIComponent(screenId)}>{screen}</Link>;
  } else if (screenId !== '' && screen === '') {
    result = <Link to={encodeURIComponent(screenId)}>{screenId}</Link>;
  } else if (screenId === '' && screen !== '') {
    result = <p>{screen}</p>;
  } else {
    result = '';
  }

  return result;
}

function fnPlayedPercent(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = ` ${dataObj[value]} %`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnExpand() {
  return '>';
}

function fnNotPlayedCountValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `Not Played ${dataObj[value]}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnPlayedCountValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `Played: ${dataObj[value]}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnSpotsMaxValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `Max: ${dataObj[value]}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnSpotsScheduledValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `Sch ${dataObj[value]}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnSpotsPlayedValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `Played: ${dataObj[value]}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnSpotsMovValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `Movies: ${dataObj[value]}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnNumNotIntValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = dataObj[value];
    } else {
      result = '';
    }
  });

  return result;
}

function fnScreenDateValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `${format(parseISO(dataObj[value]), DateFormat)} ${format(parseISO(dataObj[value]), 'hh:mm a')}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnScreenCodeValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = `Code: ${dataObj[value]}`;
    } else {
      result = '';
    }
  });

  return result;
}

function fnNumIntValue(dataObj: any, argList: string[]) {
  let result;

  argList.forEach((value) => {
    if (`${value}` in dataObj) {
      result = dataObj[value];
    } else {
      result = '';
    }
  });

  return result;
}

function fnTimeValue(dataObj: any, argList: any[]) {
  let result: any;

  argList.forEach((value, i) => {
    if (`${value}` in dataObj) {
      result += `${format(parseISO(dataObj[value]), 'hh:mm')}`;
    } else {
      result = '';
    }
    if (i === 1) {
      result += ` - `;
    }
  });

  return result;
}

function fnTestStringValue(noOfSchedules: string, orderId: string) {
  console.log(noOfSchedules);
  console.log(orderId);
}

const getValueFunction = function (colValue: any, dataObj: any) {
  let value: string | string[] | undefined | any;

  if (colValue === '' || colValue == null) {
    value = '';
  }

  if (!Array.isArray(colValue)) {
    value = '';
  }

  if (Array.isArray(colValue)) {
    const functionName = colValue[0];
    const argList: any[] | null | undefined = colValue.slice(1);

    switch (functionName) {
      case 'fnTimeValue':
        value = fnTimeValue(dataObj, argList);
        break;
      case 'fnNumIntValue':
        value = fnNumIntValue(dataObj, argList);
        break;
      case 'fnScreenDateValue':
        value = fnScreenDateValue(dataObj, argList);
        break;
      case 'fnScreenCodeValue':
        value = fnScreenCodeValue(dataObj, argList);
        break;
      case 'fnScreenNameValue':
        value = fnScreenNameValue(dataObj, argList);
        break;

      case 'fnLinkOrderIDValue':
        value = fnLinkOrderIDValue(dataObj, argList);
        break;
      case 'fnNumNotIntValue':
        value = fnNumNotIntValue(dataObj, argList);
        break;
      case 'fnSpotsPlayedValue':
        value = fnSpotsPlayedValue(dataObj, argList);
        break;
      case 'fnSpotsMovValue':
        value = fnSpotsMovValue(dataObj, argList);
        break;
      case 'fnSpotsScheduledValue':
        value = fnSpotsScheduledValue(dataObj, argList);
        break;
      case 'fnSpotsMaxValue':
        value = fnSpotsMaxValue(dataObj, argList);
        break;
      case 'fnNotPlayedCountValue':
        value = fnNotPlayedCountValue(dataObj, argList);
        break;
      case 'fnPlayedCountValue':
        value = fnPlayedCountValue(dataObj, argList);
        break;
      case 'fnNotTakenCountValue':
        value = fnNotTakenCountValue(dataObj, argList);
        break;
      case 'fnTakenCountValue':
        value = fnTakenCountValue(dataObj, argList);
        break;
      case 'fnScheduleNameValue':
        value = fnScheduleNameValue(dataObj, argList);
        break;
      case 'fnExpand':
        value = fnExpand();
        break;
      case 'fnStringValue':
        value = fnStringValue(dataObj, argList);
        break;
      case 'fnTestStringValue':
        value = fnTestStringValue(...argList);
        break;
      case 'fnPlayedPercent':
        value = fnPlayedPercent(dataObj, argList);
        break;
      default:
        value = '';
    }
  }

  return value;
};

export default getValueFunction;
