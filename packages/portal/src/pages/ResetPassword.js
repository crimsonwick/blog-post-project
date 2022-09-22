import styles from "../styles/Login/Login.module.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import YupPassword from "yup-password";
import Alert from "@mui/material/Alert";

YupPassword(yup);

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {

    errors.email? setMessage(false) : setMessage(true);

    //navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      {message && <Alert severity="success">Password Reset - Check your email</Alert>}

      <h1 className={styles.headingOne}>Reset Password</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="my-input">Email address</FormLabel>{" "}
        {/* <br />
        <br /> */}
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <OutlinedInput
              variant="outlined"
              color="secondary"
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
              checked={value}
              inputRef={ref}
              sx={{
                borderRadius: 18,
                width: 550,
                marginBottom: 2,
              }}
            />
          )}
        />
        {errors.email && (
          <span className="errorMsg">{errors.email.message}</span>
        )}
        <br />
        <Button
          // onClick={() => {



          // }}
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ borderRadius: 25, fontSize: "22px" }}
        >
          Submit
        </Button>
      </form>

      <br />
      <br />
      <br />
    </Container>
  );
}

export default ResetPassword;
