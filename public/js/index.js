window.addEventListener('load', () => {
  getCourse();

  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  document.getElementById('CurrentDate').value = date;

  setInterval(function() {
    var now = new Date();
    document.getElementById('CurrentTime').value =
      now.getHours() + ' : ' + now.getMinutes();
  }, 1000);
});

const getMentors = () => {
  apiCall('get', '/api/mentor/getMentorsData', response => {
    console.log(response);
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
  apiCall('get', '/api/course/getCourse', response => {
    console.log('Courses:', response);
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

let addAttendance = document.getElementById('addAttendance');
addAttendance.addEventListener('click', e => {
  e.preventDefault();
  console.log('clicked !');
});

function getCourseStudent(e) {
  e.preventDefault();
  const table = document.getElementById('std_table');
  //let courseId = e.target.parentNode.pathname;
  apiCall('GET', `/api/course/1`, res => {
    let data = JSON.parse(res);
    data.forEach(element => {
      const row = document.createElement('tr');
      const td_id = document.createElement('td');
      const name = document.createElement('td');
      const city = document.createElement('td');
      const btn = document.createElement('td');
      const attendbtn = document.createElement('a');

      td_id.setAttribute('scope', 'col');
      name.setAttribute('scope', 'col');
      city.setAttribute('scope', 'col');
      td_id.innerHTML = element.id;
      name.innerHTML = element.name;
      city.innerHTML = element.city;

      btn.setAttribute('scope', 'col');
      btn.classList.add('btns');
      attendbtn.addEventListener('click', funAddAttendance);
      attendbtn.setAttribute('href', element.id);
      attendbtn.setAttribute('id', 'addAttendance');
      attendbtn.classList.add('btn', 'btn-blue');
      attendbtn.innerHTML = ' Attend';
      btn.appendChild(attendbtn);

      row.appendChild(td_id);
      row.appendChild(name);
      row.appendChild(city);
      row.appendChild(btn);
      table.appendChild(row);
    });

    document.getElementById('AddAttendance').style.display = 'block';
  });
}

function funAddAttendance(e) {
  e.preventDefault();
  var today = new Date();
  let attendObj = {
    stdId: e.target.pathname,
    mentorId: document.getElementById('mentors_list').value,
    // we have just one course
    couresId: '1',
    AttendDate:
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate(),
    AttendTime: today.getHours() + ':' + today.getMinutes()
  };

  const xhr2 = new XMLHttpRequest();
  xhr2.onreadystatechange = () => {
    if (xhr2.readyState === 4 && xhr2.status === 200) {
      let data = JSON.parse(xhr2.responseText);
      console.log(data);
    }
  };
  xhr2.open('POST', '/tt');
  xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr2.send(JSON.stringify(attendObj));
}
