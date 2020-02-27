//import connection
const connection = require('../connection');

const getAttendancesData = callback => {
  //   const sql =
  //     'select  attendances.id, students.name stdname  ,courses.name coursename  from students,courses,attendances where attendances.student_id=students.id AND attendances.course_id=courses.id;';

  const sql =
    'select  attendances.id, attendances.attendDate ,attendances.attendAt , students.name stdname  ,courses.name coursename , mentors.name mentorName from students,courses,attendances,mentors where attendances.student_id=students.id AND attendances.course_id=courses.id AND attendances.mentor_Id=mentors.id;';

  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result.rows);
    }
  });
};

const addAttendances = (data, callback) => {
  if (data === undefined || data === null) return;

  let sql = `INSERT into Attendances
    (student_id,mentor_Id,course_Id,AttendDate,AttendAt)
VALUES('${data.stdId}', '${data.mentorId}', '${data.couresId}', TO_DATE('${data.AttendDate}' , 'YYYY/MM/DD'), '${data.AttendTime}');`;

  connection.query(sql, callback);
};

module.exports = { getAttendancesData, addAttendances };
