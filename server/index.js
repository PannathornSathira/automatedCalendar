const express = require('express');
const app =express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "simulation_company"
})

app.get("/Meeting", (req, res) => {
    db.query("SELECT * FROM meeting", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/showprocess", (req, res) => {
  // Extract the topic_name parameter from the request query
  const topicName = req.query.title;
  // Construct the SQL query dynamically based on the topic_name parameter
  let sqlQuery = `
    SELECT 
        s.schedule_dob AS date,
        s.topic_name,
        GROUP_CONCAT(s.emp_id ORDER BY s.emp_id) AS employees,
        MAX(s.duration) AS duration,
        AVG(CASE WHEN e.employee_worktype = 0 THEN 0 ELSE 1 END) AS mean_worktype
    FROM 
        Schedule s
    JOIN 
        Employee e ON s.emp_id = e.employee_id
  `;
  
  // Add WHERE clause to filter by topic_name if provided

  if (topicName) {
    sqlQuery += `
      WHERE 
        s.topic_name = '${topicName}'
    `;
  } 

  // Add remaining SQL query clauses
  sqlQuery += `
    GROUP BY 
        s.schedule_dob, s.topic_name
    HAVING 
        COUNT(s.emp_id) > 1
    ORDER BY 
        s.schedule_dob, s.topic_name;
  `;

  // Execute the SQL query
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});


app.post("/create", (req, res) => {
  console.log("Adding data");
  const title = req.body.title;
  const date = req.body.date;
  const description = req.body.description;
  const time = req.body.time;
  db.query(
    "INSERT INTO meeting (title, date, description,time) VALUES (?,?,?,?)",
    [title, date, description,time],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.put("/update", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  console.log("Updating");
  console.log("This is updated description: ", description)
  db.query(
    "UPDATE meeting SET description = ? WHERE title = ?",
    [description, title],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.listen('3004', ()=> {
    console.log('Server is running on port 3004')
})