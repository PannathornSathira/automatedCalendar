import React from 'react';
import './meetingStatus.css';
import StatusColumn from './statusColumn';
import Axios from "axios";
import { useState, useEffect } from "react";
function MeetingStatus() {
  const [MeetingList, setMeetingList] = useState([]);
  useEffect(() => {
    GetMeeting();
  }, []);
  const GetMeeting = () => {
    Axios.get("http://localhost:3004/Meeting").then((response) => {
        setMeetingList(response.data);
    });
  };
  return (
    <form>
    <center><h1>Meeting Status</h1></center>
     <h2>Topic : Weekly checkup 4</h2>
    <div className='mainContent'>
    {MeetingList.slice(-3).map((meeting, index) => (
          <StatusColumn key={index} item={meeting} />
        ))}
    </div>
    </form>
  );
}

export default MeetingStatus;