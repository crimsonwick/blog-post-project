import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import { default as React } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { Alerts } from '../components/Alerts';
import { Header } from '../components/Header';
import '../styles/Login/Login.module.css';
import '../styles/signup.css';
import Divider from '@mui/material/Divider';
YupPassword(yup);
const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();
interface dataInterface {
  email: string;
}
export const ResetPassword = () => {
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
  const onSubmit = async (data: dataInterface) => {
    try {
      const url = 'http://localhost:5000/users/forget-password';
      console.log(data, 'correct data');
      const options = {
        method: 'POST',
        url: url,
        data: { email: data.email },
      };
      const response = await axios(options);
      if (response) {
        Alerts.success('Mail is sent');
        navigate('/login');
      }
    } catch (err) {
      Alerts.error(' Email not Found');
    }
  };
  return (
    <Container maxWidth='sm' sx={{ marginTop: '10em' }}>
      <Header heading='Reset Password' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor='my-input'>Email address</FormLabel>
        <Controller
          control={control}
          name='email'
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { isTouched, isDirty, error },
            formState,
          }) => (
            <OutlinedInput
              color='secondary'
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
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
          <span className='errorMsg'>{errors.email.message}</span>
        )}
        <Button
          type='submit'
          variant='contained'
          color='secondary'
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
};
