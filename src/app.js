const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();

const courses = require('./controller/Courses');

app.set('port', process.env.PORT || 3001);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/e', (q, s) => {
  s.send([
    { id: 1, name: 'math' },
    { id: 2, name: 'yyy' }
  ]);
});
app.get('/api/course/getAllCourse', (req, res) => {
  courses((err, result) => {
    if (err) {
      throw err;
      return;
    }
    res.send(result.rows);
  });
});

app.listen(app.get('port'), () => {
  console.log(`the Server is Run in port ${app.get('port')}`);
});
