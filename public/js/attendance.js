apiCall('get', '/api/attendance/getAttendancesData', null, null, response => {
  const table = document.getElementById('attendance_table');

  const data = JSON.parse(response);
  console.log(data);

  /*


id: 22
attenddate: "2020-02-25T22:00:00.000Z"
attendat: "23:52:37"
stdname: "Addeddd"
coursename: "K3"
mentorname: "Isaac"

*/

  data.forEach(element => {
    const row = document.createElement('tr');
    const att_id = document.createElement('td'); // id
    const studentname = document.createElement('td'); // stdNAme
    const coursename = document.createElement('td'); // stdcourse
    const mentor = document.createElement('td'); // mentor
    const date = document.createElement('td'); // date
    const time = document.createElement('td'); // time

    att_id.setAttribute('scope', 'col');
    studentname.setAttribute('scope', 'col');
    coursename.setAttribute('scope', 'col');
    mentor.setAttribute('scope', 'col');
    date.setAttribute('scope', 'col');
    time.setAttribute('scope', 'col');

    att_id.innerHTML = element.id;
    studentname.innerHTML = element.stdname;
    coursename.innerHTML = element.coursename;

    mentor.innerHTML = element.mentorname;
    date.innerHTML = getDate(element.attenddate);
    time.innerHTML = convertTime(element.attendat);

    row.appendChild(att_id);
    row.appendChild(studentname);
    row.appendChild(coursename);

    row.appendChild(mentor);
    row.appendChild(date);
    row.appendChild(time);

    table.appendChild(row);
  });
});

function getDate(date) {
  if (date === undefined || date === null) return;

  let temp = date.split('T');
  if (temp.length > 0) {
    return temp[0];
  }
}

function convertTime(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? ' AM ' : ' PM ';
    time[0] = +time[0] % 12 || 12;
  }
  return time.join('');
}
