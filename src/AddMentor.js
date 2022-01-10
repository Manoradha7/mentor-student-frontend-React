import * as React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  mentorName: yup.string().required("This field must be required"),
  email: yup.string().email().required("This fiels must be required"),
  mobileno: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),
  // expertin : yup.string().required("This field must be required")
});
export function AddMentor() {
  const history = useHistory();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        mentorName: "",
        email: "",
        mobileno: "",
        expertin: "",
      },

      validationSchema: formValidationSchema,

      onSubmit: (newMentor) => {
        console.log("onSubmit", newMentor);
        addMentor(newMentor);
      },
    });

  const addMentor = (newMentor) => {
    console.log(newMentor);
    // const URL = ``;
    fetch(`https://mentor-student-api.herokuapp.com/create-mentor`, {
      method: "POST",
      body: JSON.stringify(newMentor),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/mentor"));
  };
  return (
    <div className="mentor-container">
      <form className="addmentor-form" onSubmit={handleSubmit}>
        <TextField
          id="name"
          name="mentorName"
          label="Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mentorName}
          error={errors.mentorName && touched.mentorName}
          helperText={
            errors.mentorName && touched.mentorName && errors.mentorName
          }
          variant="standard"
          required
        ></TextField>
        <TextField
          id="email"
          name="email"
          label="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={errors.email && touched.email}
          helperText={errors.email && touched.email && errors.email}
          variant="standard"
          required
        ></TextField>
        <TextField
          id="mobileno"
          name="mobileno"
          label="Mobile No"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mobileno}
          error={errors.mobileno && touched.mobileno}
          helperText={errors.mobileno && touched.mobileno && errors.mobileno}
          variant="standard"
          required
        ></TextField>
        <InputLabel id="demo-simple-select-label">Mentor Expert</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="expertin"
          value={values.expertin}
          label="expertin"
          name="expertin"
          onChange={handleChange}
          onBlur={handleBlur}
          variant="standard"
          sx={{ width: "150px" }}
        >
          <MenuItem value="AI">AI</MenuItem>
          <MenuItem value="MERN Stack">MERN Stack</MenuItem>
          <MenuItem value="Data Science">Data Science</MenuItem>
          <MenuItem value="Javascript">Javascript</MenuItem>
          <MenuItem value="Node JS">Node JS</MenuItem>
        </Select>

        <br />
        <Button
          variant="contained"
          color="success"
          sx={{ margin: "10px" }}
          type="submit"
        >
          Add Mentor
        </Button>
      </form>
    </div>
  );
}
