//import connection
const connection = require('../connection');

const getStudentsData = (callback) => {
    const sql = "select *  from students;";
    connection.query(sql, (err, result) => {
        console.log("run query")
        if (err) {
            console.log(err, 'error');
            callback(err);
        } else {
            console.log('Students database catched');
            callback(result.rows);
        }

    })
}
module.exports=getStudentsData;
