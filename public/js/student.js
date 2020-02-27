apiCall('get', '/api/student/getStudentsData', null, null, response => {
  const table = document.getElementById('std_table');

  const data = JSON.parse(response);
  data.forEach(element => {
    const row = document.createElement('tr');
    const td_id = document.createElement('td');
    const name = document.createElement('td');
    const city = document.createElement('td');
    td_id.setAttribute('scope', 'col');
    name.setAttribute('scope', 'col');
    city.setAttribute('scope', 'col');
    td_id.innerHTML = element.id;
    name.innerHTML = element.name;
    city.innerHTML = element.city;

    row.appendChild(td_id);
    row.appendChild(name);
    row.appendChild(city);
    table.appendChild(row);
  });
});
