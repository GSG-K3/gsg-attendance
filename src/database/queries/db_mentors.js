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
            console.log('Got DB mentor');
            callback(result.rows);
        }

    })
}

module.exports=getMentorsData;
