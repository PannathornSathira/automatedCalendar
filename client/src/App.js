
import './App.css';
import React from 'react';
import CalendarHome from './components/homeEmployee/CalendarHome';
import MeetingStatus from './components/MeetingStatus/meetingStatus';
import ChatGPT from './components/ChatGPT/ChatGPT';
import MeetingSetup from './components/MeetingSetup/meetingSetup';
import Systemprocess from './components/systemprocess/systemprocess';
import { BrowserRouter, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarHome />} />
        <Route path="/meeting-setup" element={<MeetingSetup />} />
        <Route path="/meeting-status" element={<MeetingStatus />} />
        <Route path="/chat" element={<ChatGPT />} />
        <Route path="/systemprocess" element={<Systemprocess />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
  
}

export default App;
