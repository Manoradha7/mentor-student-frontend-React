import * as React from "react";
import { useEffect, useState } from "react";

export function MentorList() {
  const [mentor, setMentor] = useState();
  const URL = `https://mentor-student-api.herokuapp.com`;
  const getMentor = () => {
    fetch(`${URL}/mentor`, { method: "GET" })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => setMentor(data));
  };

  // eslint-disable-next-line
  useEffect(getMentor, []);
  console.log(mentor)
  return mentor ? <Mentor mentor={mentor} /> : "";
}

function Mentor({ mentor }) {
  return (
    <section className="mentor list">
      <table className="mentor-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile no</th>
            <th>Expert</th>
          </tr>
        </thead>
        <tbody>
          {mentor.map(({ mentorName, email, mobileno, expertin }, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{mentorName}</td>
                <td>{email}</td>
                <td>{mobileno}</td>
                <td>{expertin}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
