//import connection
const connection = require('../connection');

const getStudentsData = callback => {
  const sql = 'select *  from students;';
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result.rows);
    }
  });
};
module.exports = getStudentsData;
