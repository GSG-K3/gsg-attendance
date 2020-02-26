const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const Mentorsquery = require("./database/queries/db_mentors");
const Coursequery = require("./database/queries/db_courses");

const app = express();

// const courses = require('./controller/Courses');

app.set("port", process.env.PORT || 3001);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/mentor/getMentorsData", (req, res) => {
  console.log("start api");
  Mentorsquery(data => {
    console.log("App mentors:", data);
    res.send(data);
  });
});

app.get("/api/course/getCourse", (req, res) => {
  console.log("Done Catching the course");
  Coursequery(data => {
    console.log("App courses :", data);
    res.send(data);
  });
});

app.listen(app.get("port"), () => {
  console.log(`the Server is Run in port ${app.get("port")}`);
});
