import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { Alerts } from '../components/Alerts';
import styles from '../styles/Login/Login.module.css';
import '../styles/signup.css';
YupPassword(yup);
const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();
function ResetPassword() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const url = 'http://localhost:5000/user/forget-password';
      console.log(data, 'correct data');
      const options = {
        method: 'POST',
        url: url,
        data: { email: data.email },
      };
      const response = await axios(options);
      console.log(response);
      Alerts.success('Mail is sent');
      navigate('/login');
    } catch (err) {
      Alerts.error(' Email not Found');
    }

    //errors.email ? setMessage(false) : setMessage(true);
    //navigate("/login");
  };
  return (
    <Container maxWidth="sm">
      {/* {message && (
        <Alert severity="success">Password Reset - Check your email</Alert>
      )} */}
      <h1 className={styles.headingOne}>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="my-input">Email address</FormLabel>
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
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            marginTop: '10px',
            borderRadius: '25px',
            fontSize: '22px',
            textTransform: 'capitalize',
          }}
        >
          Send Email
        </Button>
      </form>
    </Container>
  );
}
export default ResetPassword;
