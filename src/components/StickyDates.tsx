import React from "react";
import styled from "styled-components";

export const StickyBase = styled.div`
  position: sticky;
  background: #3a3a3b;
`;

const Wrapper = styled(StickyBase)`
  top: 0px;
  display: inline-block;
  height: 30px;
  z-index: 1;
`;

const Dummy = styled(Wrapper)`
  width: 40px;
  left: 0px;
  z-index: 1;
  float: left;
  margin-right: 15px;
`;

const TextWrapper = styled.div`
  display: inline-block;
  font-size: 13px;
  opacity: 0.8;
  font-family: ProximaNova-Semibold;
  color: #FFFFFF;
  width: 140px;
  padding: 10px 5px;
` 

type props = {
  dates: number[]
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();

  return monthNames[monthIndex] + ', ' + day;
}


export const StickyDates: React.FC<props> = ({dates}) => {
  return (
    <Wrapper>
      <Dummy></Dummy>
      {dates.map(date => {
        return (
          <TextWrapper key={date}>{formatDate(new Date(date))}</TextWrapper>
        );
      })}
    </Wrapper>
  );
};

export default StickyDates;
