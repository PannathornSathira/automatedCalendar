import { Link } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './systemprocess.css';
import axios from "axios";
function Systemprocess() { 
    const [ProcessList, setProcessList] = useState([]);
    const location = useLocation();
    const title = new URLSearchParams(location.search).get("title");
    const extractedText = title.split(" ")[0]
    let sumHours=0;
    let count=0;
    let avgTime=0;
    let sumMeanType=0;
    let typeText='';
    let startText='';
    let endText;
    let endTimeHours;
    useEffect(() => {
        GetMeeting();
      }, []);
      const GetMeeting = () => {
        axios.get("http://localhost:3004/showprocess").then((response) => {
            setProcessList(response.data);
        });
      };
    return (
      <div>
      <div className="choiceContainer">
        <h1>The meeting being the same type of your title</h1>
       {ProcessList.filter(val => val.topic_name.split(" ")[0] === extractedText).map((val, key) => {
            let startTime = ''; // Start time
            let endTime = ''; // End time
            const worktypeText = val.mean_worktype > 0.5 ? 'Night owl' : 'Early bird';
            // Convert duration time to hours
            const durationHours = val.duration.split(':').reduce((acc, time) => (60 * acc) + +time) / 60 /60;
            sumHours = sumHours+durationHours;
            count = count+1; // For finding the avg of meeting duration
            sumMeanType = sumMeanType+val.mean_worktype; // For finding the avg of employees type
            // Check if duration is greater than 0.5 hours
            if (val.mean_worktype > 0.5) {
                // If 'night owl', calculate duration as 17 - database duration
                startTime = '12:00';
            } else {
                // If 'early bird', calculate duration as database duration + 9
                startTime = '09:00';
            }
            const endTimeHours = (parseInt(startTime.split(':')[0]) + durationHours) % 24;
            endTime = `${endTimeHours < 10 ? '0' : ''}${endTimeHours}:${startTime.split(':')[1]}`;
            startTime = `${startTime}`;
            endTime = `${endTime}`;
            
                return (
                    <div className="card-body text-left">
                    {/*<p className="card-text">date: {val.date}</p>*/}
                    <h3 className="card-text">Topic_name: {val.topic_name}</h3>
                    <p className="card-text">Employee: {val.employees}</p>
                    <p className="card-text">Duration: {val.duration}</p>
                    <p className="card-text">Mean_worktype: {worktypeText}</p>
                    <p className="card-text">Start time: {startTime}</p>
                    <p className="card-text">End time: {endTime}</p>
                    {/*<p>{count}</p>*/}
                    </div>
                )
            }
            )}    
        </div>
        <h1>The result</h1>
        <h2>Therefore, the duration of the new meeting is {avgTime = Math.floor(sumHours/count)} hours</h2>
        <h2>The average working type is {sumMeanType/count} which is {typeText= sumMeanType/count > 0.5 ? 'Night owl' : 'Early bird'}</h2>
        <div className="resultProcess">



        <h3>Choice1</h3>
        <h3 className="card-text">Topic_name: {title}</h3>
        <p className="card-text">Duration: {avgTime}</p>
        <p className="card-text">Mean_worktype: {typeText}</p>
        <p className="card-text">Start time: {typeText === 'Early bird' ? '9:00':'12:00'}</p>
        <p className="card-text">End time: {endText = `${((parseInt(typeText === 'Early bird' ? '9' : '12') + avgTime) % 24) < 10 ? '0' : ''}
        ${((parseInt(typeText === 'Early bird' ? '9' : '12') + avgTime) % 24)}:00`}</p> 
        {/*Calculate end time within one line. Calculate form
         <hiden>{endTimeHours = (parseInt(typeText === 'Early bird' ? '9' : '12') + avgTime) % 24}
        {endText = `${endTimeHours < 10 ? '0' : ''}${endTimeHours}:00`}</hiden>
        */}


        <h3>Choice2</h3>
        <h3 className="card-text">Topic_name: {title}</h3>
        <p className="card-text">Duration: {avgTime}</p>
        <p className="card-text">Mean_worktype: {typeText}</p>
        <p className="card-text">Start time: {typeText === 'Early bird' ? '10:00':'13:00'}</p>
        <p className="card-text">End time: {endText = `${((parseInt(typeText === 'Early bird' ? '10' : '13') + avgTime) % 24) < 10 ? '0' : ''}
        ${((parseInt(typeText === 'Early bird' ? '10' : '13') + avgTime) % 24)}:00`}</p> 
        {/*Calculate end time within one line. Calculate form
         <hiden>{endTimeHours = (parseInt(typeText === 'Early bird' ? '9' : '12') + avgTime) % 24}
        {endText = `${endTimeHours < 10 ? '0' : ''}${endTimeHours}:00`}</hiden>
        */}




        <h3>Choice3</h3>
        <h3 className="card-text">Topic_name: {title}</h3>
        <p className="card-text">Duration: {avgTime}</p>
        <p className="card-text">Mean_worktype: {typeText}</p>
        <p className="card-text">Start time: {typeText === 'Early bird' ? '11:00':'14:00'}</p>
        <p className="card-text">End time: {endText = `${((parseInt(typeText === 'Early bird' ? '11' : '14') + avgTime) % 24) < 10 ? '0' : ''}
        ${((parseInt(typeText === 'Early bird' ? '11' : '14') + avgTime) % 24)}:00`}</p> 
        {/*Calculate end time within one line. Calculate form
         <hiden>{endTimeHours = (parseInt(typeText === 'Early bird' ? '9' : '12') + avgTime) % 24}
        {endText = `${endTimeHours < 10 ? '0' : ''}${endTimeHours}:00`}</hiden>
        */}
        </div>
        <Link to={`/`}>
        <button>Home page</button>
      </Link>
      </div>
    );
  }
export default Systemprocess;