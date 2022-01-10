import "./App.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Welcome } from "./Welcome";
import { AddStudent } from "./AddStudent";
import { AddMentor } from "./AddMentor";
// import { useState, useEffect } from "react";
import { MentorList } from "./MentorList";
import { StudentList } from "./StudentList";
function App() {
  const history = useHistory();
  // const [mentor, setMentor] = useState([]);
  // const URL = `https://mentor-student-api.herokuapp.com`;

  // useEffect(() => {
  //   fetch(`${URL}/mentor`)
  //     .then((res) => res.json)
  //     // .then((data)=>console.log(data))
  //     .then((data) => setMentor(data));
  // });

  return (
    <div className="App">
      {/* App bar */}
      <AppBar position="static" style={{ color: "#00e5ff" }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            variant="text"
            onClick={() => history.push("/")}
            color="inherit"
          >
            Home
          </Button>
          <Button
            variant="text"
            onClick={() => history.push("/student")}
            color="inherit"
          >
            Students
          </Button>
          <Button
            variant="text"
            onClick={() => history.push("/mentor")}
            color="inherit"
          >
            Mentors
          </Button>
          <Button
            variant="text"
            onClick={() => history.push("/create-student")}
            color="inherit"
          >
            Add Student
          </Button>
          <Button
            variant="text"
            onClick={() => history.push("/create-mentor")}
            color="inherit"
          >
            Add Mentor
          </Button>
        </Toolbar>
      </AppBar>

      {/* Switching Routes */}
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/student">
          <StudentList />
        </Route>
        <Route path="/mentor">
          <MentorList />
        </Route>
        <Route path="/create-student">
          <AddStudent />
        </Route>
        <Route path="/create-mentor">
          <AddMentor />
        </Route>
      </Switch>
    </div>
  );
}


export default App;
