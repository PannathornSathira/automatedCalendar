import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import './ChatGPT.css';

export default function ChatGPT() {
  const [response, setResponse] = useState("");
  const [gptResponse, setGptResponse] = useState(""); // State to hold GPT response
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const location = useLocation();
  const title = new URLSearchParams(location.search).get("title");
  const originalTitle= new URLSearchParams(location.search).get("originalTitle");
  const HTTP = "http://localhost:8080/chat";

  useEffect(() => {
    // Request response using description as the initial prompt when the component mounts
    if (title) {
      axios
        .post(HTTP, { prompt: title })
        .then((res) => {
          setResponse(res.data);
          // Set GPT response to the input field
          setGptResponse(res.data);
          // Set initial updated description to GPT response
          setUpdatedDescription(res.data);
          setUpdatedTitle(title);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [title, HTTP]);

  const handleDescriptionUpdate = (title) => {
    // Update description in the database
    axios
      .put("http://localhost:3004/update", {
        title: title,
        description: updatedDescription,
      })
      .then((res) => {
        // Update the state with the new description
        setGptResponse(updatedDescription);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bigcon">
      <div className="container container-sm p-1">
        <h1 className="title text-center text-darkGreen">Details of meeting</h1>
        <h2>This is a details of the meeting {title}</h2>
        <label>GPT Prompt : </label>
        <input
          className="updateInput"
          type="text"
          id="title"
          name="title"
          value={updatedTitle} // Display the title
          onChange={(event) => setUpdatedTitle(event.target.value)} // Allow user to edit the title
        />
        <div className="inputbox">
          <br />
          <label>Updated Description : </label>
          <input
            className="updateInput"
            type="text"
            id="description"
            name="description"
            value={updatedDescription} // Set the value of the input to the updatedDescription state
            onChange={(event) => {
              setUpdatedDescription(event.target.value);
            }}
          />
          <Link to={`/chat?title=${encodeURIComponent(updatedTitle)}&originalTitle=${encodeURIComponent(originalTitle)}`}>
          <button>Process again</button> </Link>
          <br />
        </div>
        <h2>GPT Response</h2>
        <div className="bg-darkGreen mt-2 p-1 border-5">
          <p className="text-light">
            {response ? response : "Response is loading..."}
          </p>
        </div>
        <Link to={`/systemprocess?title=${encodeURIComponent(originalTitle)}`}>
          <button onClick={() => handleDescriptionUpdate(originalTitle)}>Confirm meeting details</button>
        </Link>
      </div>
    </div>
  );
}
