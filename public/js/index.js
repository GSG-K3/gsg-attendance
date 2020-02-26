window.addEventListener("load", () => {
  getCourse();

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  document.getElementById("CurrentDate").value = date;

  setInterval(function() {
    var now = new Date();
    document.getElementById("CurrentTime").value =
      now.getHours() + " : " + now.getMinutes();
  }, 1000);
});

const getMentors = () => {
  apiCall("get", "/api/mentor/getMentorsData", response => {
    console.log(response);
    const mentorsList = document.getElementById("mentors_list");
    const data = JSON.parse(response);
    data.forEach(mentor => {
      let option = document.createElement("option");
      option.setAttribute("value", mentor.id);
      option.innerHTML = mentor.name;
      mentorsList.appendChild(option);
    });
  });
};

const getCourse = () => {
  apiCall("get", "/api/course/getCourse", response => {
    console.log("Courses:", response);
    const courseList = document.getElementById("courses");
    const data = JSON.parse(response);
    data.forEach(course => {
      let link = document.createElement("a");
      link.setAttribute("href", course.id);
      link.classList.add("course");
      let icon = document.createElement("i");
      icon.classList.add("fas", "fa-book", "fa-2x");
      let courseName = document.createElement("h2");
      courseName.innerHTML = course.name;
      link.appendChild(icon);
      link.appendChild(courseName);
      courseList.appendChild(link);
    });
    getMentors();
  });
};

let addAttendance = document.getElementById("addAttendance");
addAttendance.addEventListener("click", e => {
  e.preventDefault();
  console.log("clicked !");
});
