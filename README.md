# GSG-Attendance


The project serve the mentors of GSG by tracking the attendance of students in the code academy as well as the ability of managing the assistant mentors and having another feature for student and course managments.

## User journey
- At home page the user choose the course he/she want, then select which mentor is now taking the attendance.
- from the above menu the user can display all Attendances and all Students.

## Schema

![image](https://user-images.githubusercontent.com/56412800/75423111-b9eb2680-5946-11ea-994e-1ff80868179b.png)<br>


## How to Run 
1- clone the Reqo <br>
2- run command : npm i.<br>
3- create db in heroku
4- create config.env 
5- get the db connection and add the connection in config.env
6- to create db run this command in terminal 
    in win : node  node src\database\db_build.js
    in linux : node src/database/db_build.js
7- run server : npm start 
8- open browser and use this link : http://localhost:3001/


