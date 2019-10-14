import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  calendarData,
  tableTypes,
  tables,
  gettingData,
  bookingTimeType
} from "../utils/calendarHelper";
import { getDates } from "./../utils/calendarHelper";
import StickyDates from "./StickyDates";
import _ from "underscore";
import Tables from "./Tables";

const CalendarWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  white-space: nowrap;
  overflow: scroll;
`;

const CalendarTable = styled.div`
  display: inline-block;
  background: #242424;
`;

export type toggleBookTimeFnType = {
  (time: bookingTimeType, tableType: tables, date: number): void;
};

type props = {
  data: calendarData;
};



const Calendar: React.FC<props> = ({ data }) => {
  const [calendarData, setCalendarData] = useState<calendarData>({ dates: [] });
  const [calendarDates, setCalendarDates] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  const toggleBookTime: toggleBookTimeFnType = (time, tableType, date) => {
    const dateMatch = _.findWhere(calendarData.dates, {date: date})
    const tableTimes = dateMatch!.tables[tableType]!
    const isBooked = tableTimes.includes(time)
    if (isBooked) {
      tableTimes.splice(tableTimes.indexOf(time), 1)
    } else {
      tableTimes.push(time)
    }
    setCalendarData({...calendarData})
  };

  useEffect(() => {
    gettingData().then(calendarData => {
      setCalendarData(calendarData);
      setCalendarDates(getDates(calendarData));
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;

  return (
    <CalendarWrapper>
      <CalendarTable>
        <StickyDates dates={calendarDates}></StickyDates>
        {_.map(tableTypes, (v, k, l) => {
          return (
            <Tables
              tableType={v}
              tableTypeStr={k as tables}
              data={calendarData}
              toggleBookTime={toggleBookTime}
              key={k}
            ></Tables>
          );
        })}
      </CalendarTable>
      }
    </CalendarWrapper>
  );
};

export default Calendar;
