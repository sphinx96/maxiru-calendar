import React from "react";
import styled from "styled-components";
import Table from "./Table";
import { StickyBase } from "./StickyDates";
import { tableType, calendarData, tables, bookingTimeType } from "../utils/calendarHelper";
import _ from "underscore";
import { toggleBookTimeFnType } from "./Calendar";

const TablesRowWrapper = styled.div`
  height: 293px;
  display: flex;
  flex-wrap: nowrap;
  flex: 0 0 auto;
`;

export type toggleCurried = (time: bookingTimeType) => void;

export function getToggleCurried(
  date: number,
  tableTypeStr: tables,
  toggleBookTime: toggleBookTimeFnType
):toggleCurried {
  return (time) => {
    toggleBookTime(time, tableTypeStr, date);
  };
}

type props = {
  tableType: tableType;
  tableTypeStr: tables;
  data: calendarData;
  toggleBookTime: toggleBookTimeFnType;
};

const StickyTableTypeHeader = styled(StickyBase)`
  left: 0;
  width: 40px;
  font-family: ProximaNova-Bold;
  margin-right: 10px;
  text-align: center;
`;

const VerticalTableName = styled.div`
  position: relative;
  writing-mode: vertical-lr;
  transform: rotate(-180deg);
  font-size: 13px;
  font-family: ProximaNova-Semibold;
  color: #808080;
  text-align: right;
  line-height: 13px;
  top: 10px;
  left: 13.5px;
`;

const Tables: React.FC<props> = ({
  tableType,
  data,
  tableTypeStr,
  toggleBookTime
}) => {
  function renderTables(data: calendarData, tableTypeStr: tables) {
    return _.map(data.dates, (v, k, l) => {
      return (
        <Table
          bookedTime={v.tables[tableTypeStr]!}
          key={v.date}
          tableTypeStr={tableTypeStr}
          toggleCurryed={getToggleCurried(v.date, tableTypeStr, toggleBookTime)}
        ></Table>
      );
    });
  }

  return (
    <TablesRowWrapper>
      <StickyTableTypeHeader>
        <div style={{ fontSize: "29px", marginTop: "15px", opacity: "0.8" }}>
          <span>{tableType.sort}</span>
        </div>
        <VerticalTableName>{tableType.name}</VerticalTableName>
      </StickyTableTypeHeader>
      {renderTables(data, tableTypeStr)}
    </TablesRowWrapper>
  );
};

export default Tables;
