import React from "react";
import './meetingSetup.css';
import { useState } from "react";
import {Link} from "react-router-dom";
import Axios from "axios";
function MeetingSetup() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [description,setDescription] = useState("");
  const [MeetingList, setMeetingList] = useState([]);
  const meetingTime = time || "00:00";
  const getMeeting = () => {
    Axios.get("http://localhost:3004/Meeting").then((response) => {
        setMeetingList(response.data);
    });
  };

  const addMeeting = () => {
    Axios.post("http://localhost:3004/create", {
      title: title,
      date: date,
      description: description,
      time: meetingTime
    }).then(() => {
      setMeetingList([
        ...setMeetingList,
        {
            title: title,
            date: date,
            description: description,
            time: meetingTime,
        },
      ]);
    });
  };
    return (
      <div className="meetingsetup">
        <h1>Meeting Setup</h1>
            <div className="contentsetup">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" placeholder="Enter meeting title" 
        onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
        <br />
        <br />
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" 
         onChange={(event) => {
            setDate(event.target.value)
          }}
        />
        
        <br />
        <Link to={`/chat?title=${encodeURIComponent(title)}&originalTitle=${encodeURIComponent(title)}`}>
            <button type="submit" onClick={addMeeting}>Confirm</button>
        </Link>
        </div>
            <div className="contentmeeting">
            <button class="meetingHistrory" onClick={getMeeting}>
                Show Meeting Histrory
            </button>
            <br />
            <br />
            {MeetingList.map((val, key) => {
                return (
                    <div className="card-body text-left">
                    <p className="card-text">Title: {val.title}</p>
                    <p className="card-text">Date: {val.date}</p>
                    <p className="card-text">Description: {val.description}</p>
                    </div>
                )
            }
            
            
            )}
            </div>
    </div>
    );
  }
export default MeetingSetup;