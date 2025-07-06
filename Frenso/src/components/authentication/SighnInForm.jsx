import { Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { blue } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/auth/Action'


const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
})
const SighnInForm = () => {
    const dispatch = useDispatch();
    const formik = useFormik(
        {
            initialValues: {
                email:"",
                password:"",


            },
            validationSchema,
            onSubmit: (values) => {
                dispatch(loginUser(values))
                console.log(values)
            }
        }
    )
  return (
    <div>
<form onSubmit={formik.handleSubmit}>
  <Grid container spacing={2} direction="column">
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
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
        type="submit"
      >
        Sign In
      </Button>
    </Grid>
  </Grid>
</form>

    </div>
  )
}

export default SighnInForm