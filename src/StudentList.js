import * as React from "react";
import { useEffect, useState } from "react";

export function StudentList() {
  const [student, setStudent] = useState();
  const URL = `https://mentor-student-api.herokuapp.com`;
  const getStudent = () => {
    fetch(`${URL}/student`, { method: "GET" })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => setStudent(data));
  };

  // eslint-disable-next-line
  useEffect(getStudent, []);
  console.log(student)
  return student ? <Student student={student} /> : "";
}

function Student({ student }) {
  return (
    <section className="student list">
      <table className="student-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Course</th>
            <th>Mentor</th>
          </tr>
        </thead>
        <tbody>
          {student.map(({ studentName, studentEmail, studentDOB, course,mentorAssigned }, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{studentName}</td>
                <td>{studentEmail}</td>
                <td>{studentDOB}</td>
                <td>{course}</td>
                <td>{mentorAssigned}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
