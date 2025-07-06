import {
  Button,
  Grid,
  TextField,
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth/Action";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  dateOfBirth: Yup.object({
    day: Yup.number().required("Day is required"),
    month: Yup.number().required("Month is required"),
    year: Yup.number().required("Year is required"),
  }),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const SignUpForm = () => {
    const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      dateOfBirth: { day: "", month: "", year: "" },
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.dateOfBirth;
      const dateOfBirth = `${year}-${month}-${day}`;
      values.dateOfBirth = dateOfBirth;
      dispatch(registerUser(values));
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              variant="outlined"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {/* Day */}
              <Grid item xs={4}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.dateOfBirth?.day &&
                    Boolean(formik.errors.dateOfBirth?.day)
                  }
                >
                  <InputLabel>Day</InputLabel>
                  <Select
                    sx={{ minWidth: 150 }}
                    name="day"
                    value={formik.values.dateOfBirth.day}
                    onChange={handleDateChange("day")}
                    onBlur={formik.handleBlur}
                  >
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.dateOfBirth?.day &&
                    formik.errors.dateOfBirth?.day && (
                      <FormHelperText>
                        {formik.errors.dateOfBirth.day}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>

              {/* Month */}
              <Grid item xs={4}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.dateOfBirth?.month &&
                    Boolean(formik.errors.dateOfBirth?.month)
                  }
                >
                  <InputLabel>Month</InputLabel>
                  <Select
                    sx={{ minWidth: 150 }}
                    name="month"
                    value={formik.values.dateOfBirth.month}
                    onChange={handleDateChange("month")}
                    onBlur={formik.handleBlur}
                  >
                    {months.map((month) => (
                      <MenuItem key={month.value} value={month.value}>
                        {month.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.dateOfBirth?.month &&
                    formik.errors.dateOfBirth?.month && (
                      <FormHelperText>
                        {formik.errors.dateOfBirth.month}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>

              {/* Year */}
              <Grid item xs={4}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.dateOfBirth?.year &&
                    Boolean(formik.errors.dateOfBirth?.year)
                  }
                >
                  <InputLabel>Year</InputLabel>
                  <Select
                    sx={{ minWidth: 150 }}
                    name="year"
                    value={formik.values.dateOfBirth.year}
                    onChange={handleDateChange("year")}
                    onBlur={formik.handleBlur}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.dateOfBirth?.year &&
                    formik.errors.dateOfBirth?.year && (
                      <FormHelperText>
                        {formik.errors.dateOfBirth.year}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                borderRadius: "29px",
                py: "15px",
                bgcolor: blue[500],
              }}
              type="submit"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignUpForm;
