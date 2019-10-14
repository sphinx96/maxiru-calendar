import React from 'react';
import Calendar from './components/Calendar';
import {  } from "module";
import { dataMock } from './utils/calendarHelper';



const App: React.FC = () => {
  return (
    <div className="App">
      <Calendar data={dataMock}></Calendar>
    </div>
  );
}

export default App;
