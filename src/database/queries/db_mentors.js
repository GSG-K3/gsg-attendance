//import connection
const connection = require('../connection');

const getMentorsData = (callback) => {
    const sql = "select *  from mentors;";
    connection.query(sql, (err, result) => {
        console.log("run query")
        if (err) {
            console.log(err, 'error');
            callback(err);
        } else {
            console.log('Mentors database catched');
            callback(result.rows);
        }

    })
}
module.exports=getMentorsData;
