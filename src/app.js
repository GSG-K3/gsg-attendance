const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const Mentorsquery = require('./database/queries/db_mentors');
const studentsquery = require('./database/queries/db_students');

const app = express();


app.set('port', process.env.PORT || 3001);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/mentor/getMentorsData', (req, res) => {
  console.log('start api');
  Mentorsquery(data => {
    res.send(data);
  });
});

app.get('/Students', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'student.html'));
});

app.get('/api/student/getStudentsData', (req, res) => {
  console.log('start api');
  studentsquery(data => {
    res.send(data);
  });
});

app.listen(app.get('port'), () => {
  console.log(`the Server is Run in port ${app.get('port')}`);
});
