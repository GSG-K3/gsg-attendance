window.addEventListener('load', () => {
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

apiCall('get', '/api/mentor/getMentorsData', response => {
  console.log(response);
});
