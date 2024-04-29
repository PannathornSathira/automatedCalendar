import React from 'react';
import './CalendarHome.css';
import {Link} from "react-router-dom";
function CalendarHome() {

    return (
      <div>
      <div className="navigation">
      <ul>
      <li><a href="default.asp">Logout</a></li>
      <li><a href="news.asp">Account</a></li>
      <li><a href="contact.asp">Schedule</a></li>
      <h2 className="left">CALENDAR</h2>
      </ul>
      </div>
      <div className="content">
      <Link to="/meeting-setup">Meeting Setup</Link>
      <Link to="/meeting-status">Meeting Status</Link>
      <Link to="/meeting-status">Confrim Attendance</Link>
      {/*<Link to="/chat">Asking gpt</Link>*/}
      </div>
      <div className="footer">
      <ul>
      <li><a href="default.asp">Contact us</a></li>
      <li><a href="news.asp">Help</a></li>
      </ul>
      </div>
      
      </div>
    );
  }
  
  export default CalendarHome;