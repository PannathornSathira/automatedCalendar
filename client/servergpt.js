const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");
const OpenAI =require("openai")
/*
const config = new Configuration({
  apiKey: "sk-proj-vtEA3zIHH8fBZuKtKqYcT3BlbkFJwIXWRnHxdDMe1znjJnyr",
});
import OpenAI from 'openai';
*/
// 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 for userapi
// sk-proj-vtEA3zIHH8fBZuKtKqYcT3BlbkFJwIXWRnHxdDMe1znjJnyr for projectapi
const openai = new OpenAI({
  apiKey: "sk-proj-vtEA3zIHH8fBZuKtKqYcT3BlbkFJwIXWRnHxdDMe1znjJnyr" // This is also the default, can be omitted
});
// Setup server

const app = express();
app.use(bodyParser.json());
app.use(cors());

// endpoint for ChatGPT

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const pre_promp= "You need to give some details of the following meeting title: ";
  let full_promp= pre_promp+prompt;
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: full_promp,
    max_tokens: 50,
  });
  console.log("This is full_promp:", full_promp);
  //console.log("Completion object:", completion);
  console.log("Completion object:", completion.choices[0].text);

  res.send(completion.choices[0].text);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//run node server.js