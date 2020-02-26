const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const Mentorsquery = require("./database/queries/db_mentors");
const studentsquery = require("./database/queries/db_students");
const Coursequery = require("./database/queries/db_courses");
const attendancesquery = require("./database/queries/db_attendance");

const app = express();

app.set("port", process.env.PORT || 3001);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/attendance", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "attendance.html"));
});

app.get("/api/attendance/getAttendancesData", (req, res) => {
  console.log("start attendance api");
  attendancesquery(data => {
    res.send(data);
  });
});

app.get("/api/mentor/getMentorsData", (req, res) => {
  console.log("start mentors api");
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

app.get("/Students", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "student.html"));
});

app.get("/api/student/getStudentsData", (req, res) => {
  console.log("start student api");
  studentsquery(data => {
    res.send(data);
  });
});

app.listen(app.get("port"), () => {
  console.log(`the Server is Run in port ${app.get("port")}`);
});
