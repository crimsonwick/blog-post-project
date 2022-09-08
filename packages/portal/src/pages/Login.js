import styles from "./Login.module.css";

import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import React from "react";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup
//   .object({
//     email: yup.string().required(),
//     password: yup.string().required(),
//   })
//   .required();

function Login() {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Container maxWidth="md">
      <h1 className={styles.headingOne}>Log In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="my-input">Email address or username</FormLabel>

        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <OutlinedInput
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
              checked={value}
              inputRef={ref}
              sx={{
                borderRadius: 18,
              }}
              fullWidth
              variant="outlined"
            />
          )}
        />
        <br />

        <FormLabel htmlFor="my-input">Password</FormLabel>
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <OutlinedInput
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
              checked={value}
              inputRef={ref}
              style={{
                borderRadius: 18,
              }}
              fullWidth
              variant="outlined"
            />
          )}
        />
        <br />

        <Link to="/create-article">
          <h5 className={styles.headingFive}>Forgot your password?</h5>
        </Link>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            borderRadius: 25,
            fontSize: "18px",
          }}
        >
          Log in
        </Button>
      </form>

      <br />
      <br />
      <Divider />

      <h3 className={styles.h3}>Don't have an account?</h3>

      <Link to="/SignUp">
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: "25px" , fontSize: "18px"}}
        >
          Sign up
        </Button>
      </Link>
      <br />
    </Container>
  );
}

export default Login;
