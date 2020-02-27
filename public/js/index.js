window.addEventListener('load', () => {
  getCourse();

  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  document.getElementById('CurrentDate').value = date;

  let currentTime = document.getElementById('CurrentTime');
  currentTime.value = ConvertTime(today.getHours() + ':' + today.getMinutes());
  setInterval(function() {
    var now = new Date();
    currentTime.value = ConvertTime(now.getHours() + ':' + now.getMinutes());
  }, 1000);

  mentorlist = document.getElementById('mentors_list');
  if (mentorlist !== undefined && mentorlist !== null) {
    mentorlist.addEventListener('change', changeMentors);
  }
});

const getMentors = () => {
  apiCall('get', '/api/mentor/getMentorsData', null, null, response => {
    const mentorsList = document.getElementById('mentors_list');
    const data = JSON.parse(response);
    data.forEach(mentor => {
      let option = document.createElement('option');
      option.setAttribute('value', mentor.id);
      option.innerHTML = mentor.name;
      mentorsList.appendChild(option);
    });
  });
};

const getCourse = () => {
  apiCall('get', '/api/course/getCourse', null, null, response => {
    const courseList = document.getElementById('courses');
    const data = JSON.parse(response);
    data.forEach(course => {
      let link = document.createElement('a');
      link.addEventListener('click', getCourseStudent);
      link.setAttribute('href', course.id);
      link.classList.add('course');
      let icon = document.createElement('i');
      icon.classList.add('fas', 'fa-book', 'fa-2x');
      let courseName = document.createElement('h2');
      courseName.innerHTML = course.name;
      link.appendChild(icon);
      link.appendChild(courseName);
      courseList.appendChild(link);
    });
    getMentors();
  });
};

function changeMentors(e) {
  const mentorList = e.target;
  const mentorName = mentorList.options[mentorList.selectedIndex].text;
  const stdtable = document.getElementById('std_table');
  for (let i = 0; i < stdtable.rows.length; i++) {
    let ree = stdtable.rows[i].cells[8].innerHTML;
    if (stdtable.rows[i].cells[8].innerHTML !== 'ok') {
      stdtable.rows[i].cells[4].innerHTML = mentorName;
    }
  }
}

function getCourseStudent(e) {
  e.preventDefault();
  const table = document.getElementById('std_table');
  //let courseId = e.target.parentNode.pathname;
  const courseName = 'K3';
  const mentorList = document.getElementById('mentors_list');
  const mentorName = mentorList.options[mentorList.selectedIndex].text;
  apiCall('GET', `/api/course/1`, null, null, res => {
    let data = JSON.parse(res);
    data.forEach(element => {
      const row = document.createElement('tr');
      const td_id = document.createElement('td'); // id
      const name = document.createElement('td'); // name
      const city = document.createElement('td'); // city
      const course = document.createElement('td'); // course
      const mentor = document.createElement('td'); // mentor
      const date = document.createElement('td'); //date
      const time = document.createElement('td'); // time
      const btn = document.createElement('td');
      const isAdded = document.createElement('td');
      const attendbtn = document.createElement('a');

      row.setAttribute('id', `row_${element.id}`);
      td_id.setAttribute('scope', 'col');
      name.setAttribute('scope', 'col');
      city.setAttribute('scope', 'col');
      course.setAttribute('scope', 'col');
      mentor.setAttribute('scope', 'col');
      mentor.setAttribute('id', `td_mentor_${element.id}`);
      date.setAttribute('scope', 'col');
      date.setAttribute('id', `td_date_${element.id}`);
      time.setAttribute('scope', 'col');
      time.setAttribute('id', `td_time_${element.id}`);
      btn.setAttribute('scope', 'col');
      btn.classList.add('btns');
      isAdded.setAttribute('id', `td_add_${element.id}`);
      isAdded.style.display = 'none';
      attendbtn.addEventListener('click', funAddAttendance);
      attendbtn.setAttribute('href', element.id);
      attendbtn.setAttribute('id', 'addAttendance');
      attendbtn.classList.add('btn', 'btn-blue');
      attendbtn.innerHTML = ' Attend';

      td_id.innerHTML = element.id;
      name.innerHTML = element.name;
      city.innerHTML = element.city;
      course.innerHTML = courseName;
      mentor.innerHTML = mentorName;

      btn.appendChild(attendbtn);
      row.appendChild(td_id);
      row.appendChild(name);
      row.appendChild(city);
      row.appendChild(course);
      row.appendChild(mentor);
      row.appendChild(date);
      row.appendChild(time);
      row.appendChild(btn);
      row.appendChild(isAdded);
      table.appendChild(row);
    });

    document.getElementById('AddAttendance').style.display = 'block';
  });
}

function funAddAttendance(e) {
  e.preventDefault();

  var now = new Date();
  let attendObj = {
    stdId: e.target.pathname.replace('/', ''),
    mentorId: document.getElementById('mentors_list').value,
    // we have just one course
    couresId: '1',
    AttendDate: document.getElementById('CurrentDate').value,
    AttendTime: ConvertTime(
      now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    )
  };

  apiCall(
    'POST',
    '/api/attendance/TakeAttendance',
    JSON.stringify(attendObj),
    'application/json;charset=UTF-8',
    res => {
      const status = JSON.parse(res);
      console.log(status);
      const temp = status[0];
      if (temp.data === 'error') {
        alert('Sorry Some Error happened , please try Again later');
        console.log(status[1].errorDate);
        return;
      }
      if (temp.data === 'ok') {
        const stdRow = document.getElementById(`row_${attendObj.stdId}`);
        if (stdRow !== undefined && stdRow != null) {
          stdRow.style.backgroundColor = '#28a745';
          stdRow.cells[5].innerHTML = attendObj.AttendDate;
          stdRow.cells[6].innerHTML = attendObj.AttendTime;
          let sd = stdRow.cells[7].firstChild;
          stdRow.cells[7].firstChild.style.display = 'none';
          stdRow.cells[8].innerHTML = 'ok';
        }
      }
    }
  );
}

function ConvertTime(time) {
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
