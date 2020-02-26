apiCall('get', '/api/attendance/getAttendancesData', response => {
    console.log(response);


     const table=document.getElementById('attendance_table');

    const data = JSON.parse(response);
    data.forEach(element => {
        const row = document.createElement('tr');
        const att_id = document.createElement('td');
        const studentname = document.createElement('td');
        const coursename = document.createElement('td');

        att_id.setAttribute("scope", 'col');
        studentname.setAttribute("scope", 'col');
        coursename.setAttribute("scope", 'col');
        att_id.innerHTML=element.id;
        studentname.innerHTML = element.stdname;
        coursename.innerHTML = element.coursename;

        row.appendChild(att_id);
        row.appendChild(studentname);
        row.appendChild(coursename);
        table.appendChild(row);

    });




});
