BEGIN;

    DROP TABLE IF EXISTS Students,mentors,Courses,Attendances
    CASCADE;

CREATE TABLE Courses
(
    id serial PRIMARY KEY ,
    name VARCHAR(200) NOT NULL,
    startDate date,
    EndDate date,
    sessionNum INT
);

CREATE TABLE Students
(
    id serial PRIMARY KEY ,
    name VARCHAR(200) NOT NULL,
    city VARCHAR(200) NOT NULL
);


CREATE TABLE mentors
(
    id serial PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);


CREATE TABLE Attendances
(
    id serial PRIMARY KEY ,
    student_id INT NOT NULL,
    mentor_Id INT NOT NULL,
    course_Id INT NOT NULL,
    AttendDate date,
    AttendAt TIME,
    RedFlag bit,
    FOREIGN KEY (student_id) REFERENCES Students(id),
    FOREIGN KEY (mentor_Id) REFERENCES mentors(id),
    FOREIGN KEY (course_Id) REFERENCES Courses(id)
);






insert into mentors
    (name)
VALUES
    ('Isaac'),
    ('Farah'),
    ('Matt'),
    ('Yousef'),
    ('Duaa'),
    ('Sara')
RETURNING ID;


insert into Students
    (name,city)
VALUES
    ('yakoob', 'hebron'),
    ('nujood', 'hebron'),
    ('Addeddd', 'dura'),
    ('hussein', 'dura')
RETURNING ID;



INSERT into Courses
    (name)
VALUES
    ('K3');



INSERT into Attendances
    (student_id,mentor_Id,course_Id,AttendDate,AttendAt)
VALUES(1, 1, 1, TO_DATE('2020/02/25' , 'YYYY/MM/DD'), '9:45');

INSERT into Attendances
    (student_id,mentor_Id,course_Id,AttendDate,AttendAt)
VALUES(2, 2, 1, TO_DATE('2020/02/25' , 'YYYY/MM/DD'), '9:45');

INSERT into Attendances
    (student_id,mentor_Id,course_Id,AttendDate,AttendAt)
VALUES(3, 2, 1, TO_DATE('2020/02/25' , 'YYYY/MM/DD'), '9:45');


COMMIT;
