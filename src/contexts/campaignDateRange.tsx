import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo, useRef } from 'react';
import { add, format, startOfYesterday } from 'date-fns';

import { DateFormat } from 'src/consts';
import { usePersistedState } from 'src/hooks';

interface IDateResponse {
  startDate: string;
  endDate: string;
  handleChangeStartDate(newValue: string): void;
  handleChangeEndDate(newValue: string): void;
}

interface ICampaignDateRangeProps {
  getOrdersDateRange(): IDateResponse;
  getSchedulesDateRange(): IDateResponse;
  getScreensDateRange(): IDateResponse;
  getShowsDateRange(): IDateResponse;
}

const baseKey = 'campaignDateRange-';

const defaultYesterday = format(startOfYesterday(), DateFormat);
const defaultWeekAhead = format(add(startOfYesterday(), { weeks: 1, days: 1 }), DateFormat);

const defaultContextValue: IDateResponse = {
  startDate: defaultYesterday,
  endDate: defaultWeekAhead,
  handleChangeEndDate: () => {},
  handleChangeStartDate: () => {},
};

const BaseContext = createContext<ICampaignDateRangeProps>({
  getOrdersDateRange: () => defaultContextValue,
  getSchedulesDateRange: () => defaultContextValue,
  getScreensDateRange: () => defaultContextValue,
  getShowsDateRange: () => defaultContextValue,
});

export const CampaignDateRangeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const isShowInitialized = useRef(false);
  const [showsStart, setShowsStart] = usePersistedState(`${baseKey}shows-start`, defaultYesterday);
  const [showsEnd, setShowsEnd] = usePersistedState(`${baseKey}shows-end`, defaultWeekAhead);

  const isScreensInitialized = useRef(false);
  const [screensStart, setScreensStart] = usePersistedState(`${baseKey}screens-start`, defaultYesterday);
  const [screensEnd, setScreensEnd] = usePersistedState(`${baseKey}screens-end`, defaultWeekAhead);

  const isSchedulesInitialized = useRef(false);
  const [schedulesStart, setSchedulesStart] = usePersistedState(`${baseKey}schedules-start`, defaultYesterday);
  const [schedulesEnd, setSchedulesEnd] = usePersistedState(`${baseKey}schedules-end`, defaultWeekAhead);

  const [ordersStart, setOrdersStart] = usePersistedState(`${baseKey}orders-start`, defaultYesterday);
  const [ordersEnd, setOrdersEnd] = usePersistedState(`${baseKey}orders-end`, defaultWeekAhead);

  const getOrdersDateRange = useCallback(
    (): IDateResponse => ({
      endDate: ordersEnd,
      startDate: ordersStart,
      handleChangeEndDate: (value: string) => {
        setOrdersEnd(value);
        setSchedulesEnd(value);
        setScreensEnd(value);
        setShowsEnd(value);
      },
      handleChangeStartDate: (value: string) => {
        setOrdersStart(value);
        setSchedulesStart(value);
        setScreensStart(value);
        setShowsStart(value);
      },
    }),
    [
      ordersEnd,
      ordersStart,
      setOrdersEnd,
      setOrdersStart,
      setSchedulesEnd,
      setScreensEnd,
      setShowsEnd,
      setSchedulesStart,
      setScreensStart,
      setShowsStart,
    ],
  );

  const getSchedulesDateRange = useCallback((): IDateResponse => {
    if (isSchedulesInitialized.current === false) {
      isSchedulesInitialized.current = true;

      if (schedulesStart === defaultYesterday || schedulesEnd === defaultYesterday) {
        setSchedulesStart(ordersStart);
        setSchedulesEnd(ordersEnd);
      }
    }

    return {
      endDate: schedulesEnd,
      startDate: schedulesStart,
      handleChangeEndDate: (value: string) => {
        setSchedulesEnd(value);
        setScreensEnd(value);
        setShowsEnd(value);
      },
      handleChangeStartDate: (value: string) => {
        setSchedulesStart(value);
        setScreensStart(value);
        setShowsStart(value);
      },
    };
  }, [
    schedulesEnd,
    schedulesStart,
    setSchedulesEnd,
    setSchedulesStart,
    ordersStart,
    ordersEnd,
    setScreensEnd,
    setShowsEnd,
    setScreensStart,
    setShowsStart,
  ]);

  const getScreensDateRange = useCallback((): IDateResponse => {
    if (isScreensInitialized.current === false) {
      isScreensInitialized.current = true;

      if (screensStart === defaultYesterday || screensEnd === defaultYesterday) {
        setScreensStart(schedulesStart);
        setScreensEnd(schedulesEnd);
      }
    }

    return {
      endDate: screensEnd,
      startDate: screensStart,
      handleChangeEndDate: (value: string) => {
        setScreensEnd(value);
        setShowsEnd(value);
      },
      handleChangeStartDate: (value: string) => {
        setScreensStart(value);
        setShowsStart(value);
      },
    };
  }, [
    schedulesEnd,
    schedulesStart,
    setScreensEnd,
    setScreensStart,
    screensEnd,
    screensStart,
    setShowsStart,
    setShowsEnd,
  ]);

  const getShowsDateRange = useCallback((): IDateResponse => {
    if (isShowInitialized.current === false) {
      isShowInitialized.current = true;

      if (showsStart === defaultYesterday || showsEnd === defaultYesterday) {
        setShowsStart(screensStart);
        setShowsEnd(screensEnd);
      }
    }

    return {
      endDate: showsEnd,
      startDate: showsStart,
      handleChangeEndDate: setShowsEnd,
      handleChangeStartDate: setShowsStart,
    };
  }, [showsEnd, showsStart, setShowsEnd, setShowsStart, screensEnd, screensStart]);

  const contextValue: ICampaignDateRangeProps = useMemo(
    () => ({
      getOrdersDateRange,
      getSchedulesDateRange,
      getScreensDateRange,
      getShowsDateRange,
    }),
    [getOrdersDateRange, getSchedulesDateRange, getScreensDateRange, getShowsDateRange],
  );

  return <BaseContext.Provider value={contextValue}>{children}</BaseContext.Provider>;
};

export const useCampaingDateRangeContext = () => useContext(BaseContext);
