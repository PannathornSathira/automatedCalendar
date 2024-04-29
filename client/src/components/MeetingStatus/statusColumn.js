import { Link } from "react-router-dom";
import './statusColumn.css';
import React from "react";
function StatusColumn({item}) {
    const {title, date, description} = item;
    return (
      <div className="choiceContainer">
        <h1>{title}</h1>
        <h3>Date: {date} </h3>
        <h3>Time: 12 PM</h3>
        <h3>Place: Main building </h3>
        <h3>Description: {description} </h3>
        <Link to="/"><button>Choose</button></Link>
        </div>
    );
  }
export default StatusColumn;