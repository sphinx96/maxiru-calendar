import React from "react";
import styled from "styled-components";
import { bookingTimeType, bookingTime, isBookedTime, tables } from "../utils/calendarHelper";
import { getPercentage } from "./../utils/calendarHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import _ from "underscore";
import { toggleCurried } from './Tables';

const TableWrapper = styled.div`
  flex: 0 0 auto;
  width: 140px;
  height: 273px;
  overflow: hidden;
  margin: 15px 5px;
  background: #323133;
  border-radius: 4px;
`;

const TableHeading = styled.div`
  max-height: 60px;
  padding: 6px 16px;
  border-bottom: 1px solid #414042;
`;

const PercentageWrapper = styled.span<{ percentage: number }>`
  font-size: 40px;
  font-family: ProximaNova-Bold;
  color: ${props => {
    if (props.percentage === 0) return "#C1C1C2";
    if (props.percentage < 33) return "#9BE84D";
    if (props.percentage < 66) return "#E8CE4D";
    if (props.percentage < 90) return "#E8944D";
    return "#E8614D";
  }};
  letter-spacing: 0;
`;

const PercentageSign = styled.span`
  position: relative;
  top: -20px;
  margin-left: 2px;
  opacity: 0.5;
  font-family: ProximaNova-Bold;
  font-size: 10px;
  color: #ffffff;
  letter-spacing: 0;
`;
const ThreeDotsWrapper = styled.div`
  float: right;
  position: relative;
  margin-top: 5px;
  color: #808080;
`;
const TableTimesWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 5px 3px;
`;
const TableTimeWrapper = styled.div<{isBooked: boolean}>`
  flex: 0 0 auto;
  width: 50%;
  text-align: center;
  width: 62px;
  height: 30px;
  margin: 2px;
  font-family: ProximaNova-Semibold;
  font-size: 13px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;

  opacity: ${({isBooked})=> isBooked ? '0.5' : '0.7'};
  background: ${({isBooked})=> isBooked ? '#242424' : 'none'};
  border-radius: 2px;
`;
const TableTime = styled.span<{isBooked: boolean}>`
  opacity: ${({isBooked})=> isBooked ? '0.3' : '0.7'};
  font-family: ProximaNova-Semibold;
  font-size: 13px;
  color: #FFFFFF;
  line-height: 13px;
`;

type props = {
  bookedTime: Partial<bookingTimeType>[];
  tableTypeStr: tables;
  toggleCurryed: toggleCurried;

};

const Table: React.FC<props> = ({ bookedTime, tableTypeStr, toggleCurryed }) => {
  const percentage = getPercentage(bookedTime);
  return (
    <TableWrapper>
      <TableHeading>
        <PercentageWrapper percentage={percentage}>
          {percentage}
          <PercentageSign>%</PercentageSign>
        </PercentageWrapper>
        <ThreeDotsWrapper>
          <FontAwesomeIcon icon={faEllipsisV} />
        </ThreeDotsWrapper>
      </TableHeading>
      <TableTimesWrapper>
        {_.map(bookingTime, time => {
          const isBooked = isBookedTime(bookedTime, time);
          return <TableTimeWrapper key={time} isBooked={isBooked} onClick={()=> toggleCurryed(time)}>
            <TableTime isBooked={isBooked}>{time}</TableTime>
          </TableTimeWrapper>;
        })}
      </TableTimesWrapper>
    </TableWrapper>
  );
};

export default Table;
