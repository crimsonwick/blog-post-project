import styles from '../styles/Login/Login.module.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/signup.css';
import YupPassword from 'yup-password';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import axios from 'axios';
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
      email: '',
    },
    resolver: yupResolver(schema),
  });
  const [message, setMessage] = useState(false);
  const onSubmit = async (data) => {
    const url = 'http://localhost:5000/user/forget-password';
    console.log(data, 'correct data');
    const options = {
      method: 'POST',
      url: url,
      data: { email: data.email },
    };
    const response = await axios(options);
    const record = response.data;
    if (record.statusText === 'Success') {
      toast.success(record.message);
    } else {
      toast.error(record.message);
    }

    errors.email ? setMessage(false) : setMessage(true);
    //navigate("/login");
  };
  return (
    <Container maxWidth="sm">
      {message && (
        <Alert severity="success">Password Reset - Check your email</Alert>
      )}
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
        <br />
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
      <br />
      <br />
      <br />
    </Container>
  );
}
export default ResetPassword;
