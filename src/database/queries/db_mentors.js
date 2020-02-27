//import connection
const connection = require('../connection');

const getMentorsData = callback => {
  const sql = 'select *  from mentors;';
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result.rows);
    }
  });
};

module.exports = getMentorsData;
