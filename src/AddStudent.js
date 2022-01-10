import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useEffect , useState} from "react";
import Button from '@mui/material/Button';

const formValidationSchema = yup.object({
  studentName: yup.string().required("This field must be required"),
  studentEmail: yup.string().email().required("This field must be required"),
  studentDOB: yup
    .date()
    .required("This field must be required"),
});

export function AddStudent() {
    const history = useHistory();
    const [mentors,setMentors] = useState ("")
    // const URL = `http://localhost:9000`;
    const URL = `https://mentor-student-api.herokuapp.com`;
  
    const { handleSubmit, handleChange, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        studentName: "",
        studentEmail: "",
        studentDOB: "",
        course: ""
      },
      // validate form
      validationSchema: formValidationSchema,
      onSubmit: (newStudent) => addStudent(newStudent),
    });

  useEffect(() => {
    fetch(`${URL}/mentor`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mentor) => setMentors(mentor));
      // eslint-disable-next-line
  }, []);

  const addStudent = (newStudent) => {
    fetch(`${URL}/create-student`, {
      method: "POST",
      body: JSON.stringify(newStudent),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/student"));
  };
  return (
    <div className="add-student">
      <form className="add-student-form" onSubmit={handleSubmit}>
        <TextField
          id="name"
          name="studentName"
          value={values.studentName}
          error={errors.studentName && touched.studentName}
          helperText={
            errors.studentName && touched.studentName && errors.studentName
          }
          onChange={handleChange}
          onBlur={handleBlur}
          label="Name"
          type="text"
          variant="standard"
          required
        />
        <TextField
          id="Email"
          name="studentEmail"
          value={values.studentEmail}
          error={errors.studentEmail && touched.studentEmail}
          helperText={
            errors.studentEmail && touched.studentEmail && errors.studentEmail
          }
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          label="Email"
          variant="standard"
          required
        />
        {/* <InputLabel id="demo-simple-select-standard-label">DOB</InputLabel> */}
        <TextField
          id="DOB"
          name="studentDOB"
          value={values.studentDOB}
          error={errors.studentDOB && touched.studentDOB}
          helperText={
            errors.studentDOB && touched.studentDOB && errors.studentDOB
          }
          onChange={handleChange}
          onBlur={handleBlur}
          label=""
          type="date"
          sx={{ width: "180px" }}
          variant="standard"
          required
        />
        <InputLabel id="demo-simple-select-standard-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="course"
          sx={{ width: "200px" }}
          value={values.course}
          onChange={handleChange}
          label="Course"
          variant="standard"
          required
        >
          <MenuItem value="AI">AI</MenuItem>
          <MenuItem value="MEAN">MEAN STACK</MenuItem>
          <MenuItem value="Python">Python</MenuItem>
        </Select>
        <InputLabel id="demo-simple-select-label">Mentor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.mentorAssigned}
          name="mentorAssigned"
          label="mentor"
          onChange={handleChange}
          onBlur={handleBlur}
          variant="standard"
          required
          sx={{ width: "200px" }}
        >
          {mentors.length > 0 &&
            mentors.map((mentor, index) => {
              return (
                <MenuItem key={index} value={mentor.mentorName}>
                  {mentor.mentorName}
                </MenuItem>
              );
            })}
        </Select>
        <Button
          variant="contained"
          color="success"
          sx={{ margin: "10px" }}
          type="submit"
        >
          Add Student
        </Button>
      </form>
    </div>
  );
}
