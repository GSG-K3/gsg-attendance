const connection = require("./../connection");

const getCourse = callback => {
  const sql = "select * from courses";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Catched error for course");
      callback(error);
    } else {
      console.log("Got DB-Course");
      callback(result.rows);
    }
  });
};

module.exports = getCourse;
