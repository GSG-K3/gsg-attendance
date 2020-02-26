//import connection
const connection = require('../connection');

const getAttendancesData = (callback) => {
    const sql = "select  attendances.id, students.name stdname  ,courses.name coursename  from students,courses,attendances where attendances.student_id=students.id AND attendances.course_id=courses.id;";


    connection.query(sql, (err, result) => {
        console.log("run query")
        if (err) {
            console.log(err, 'error');
            callback(err);
        } else {
            console.log('Attendance database catched');
            callback(result.rows);
        }

    })
}
module.exports = getAttendancesData;
