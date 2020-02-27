const connection = require('./../connection');

const getCourse = callback => {
  const sql = 'select * from courses';
  connection.query(sql, (error, result) => {
    if (error) {
      callback(error);
    } else {
      callback(result.rows);
    }
  });
};

module.exports = getCourse;
