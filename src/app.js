const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const Mentorsquery = require('./database/queries/db_mentors');
const studentsquery = require('./database/queries/db_students');
const Coursequery = require('./database/queries/db_courses');
const attendancesquery = require('./database/queries/db_attendance');

const app = express();

app.set('port', process.env.PORT || 3001);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/attendance', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'attendance.html'));
});

app.get('/api/attendance/getAttendancesData', (req, res) => {
  attendancesquery.getAttendancesData(data => {
    res.send(data);
  });
});

app.post('/api/attendance/TakeAttendance', (req, res) => {
  var obj = {
    stdId: req.body.stdId.trim(),
    mentorId: req.body.mentorId.trim(),
    couresId: req.body.couresId.trim(),
    AttendDate: req.body.AttendDate.trim(),
    AttendTime: req.body.AttendTime.trim()
  };

  attendancesquery.addAttendances(obj, (err, result) => {
    if (err) {
      res.send([{ data: 'error' }, { errorDate: err }]);
    }
    res.send([{ data: 'ok' }]);
  });
});

app.get('/api/mentor/getMentorsData', (req, res) => {
  Mentorsquery(data => {
    res.send(data);
  });
});

app.get('/api/course/getCourse', (req, res) => {
  Coursequery(data => {
    res.send(data);
  });
});

app.get('/api/course/:courseId', (req, res) => {
  studentsquery(data => {
    res.send(data);
  });
});

app.get('/Students', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'student.html'));
});

app.get('/api/student/getStudentsData', (req, res) => {
  studentsquery(data => {
    res.send(data);
  });
});

app.listen(app.get('port'), () => {
  console.log(`the Server is Run in port ${app.get('port')}`);
});
