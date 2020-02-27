# GSG-Attendance

site : https://gss-w7d3psql.herokuapp.com/

The project serve the mentors of GSG by tracking the attendance of students in the code academy as well as the ability of managing the assistant mentors and having another feature for student and course managments.

## User journey
- At home page the user choose the course he/she want, then select which mentor is now taking the attendance.
- from the above menu the user can display all Attendances and all Students.

## Schema
![image](https://user-images.githubusercontent.com/56412800/75424197-d9834e80-5948-11ea-8e29-32557cf99ce6.png)

<br>


## How to Run 
1- clone the Reqo <br>
2- run command : npm i.<br>
3- create db in heroku <br>
4- create config.env <br>
5- get the db connection and add the connection in config.env<br>
6- to create db run this command in terminal: <br>
   <tab> - in win : node  node src\database\db_build.js<br>
   <tab> - in linux : node src/database/db_build.js<br>
7- run server : npm start <br>
8- open browser and use this link : http://localhost:3001/


