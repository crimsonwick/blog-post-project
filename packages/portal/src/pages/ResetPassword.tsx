import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
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
import '../styles/signup.css';
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
    <Container maxWidth="sm" sx={{ marginTop: '10em' }}>
      <Header heading="Reset Password" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="my-input">Email address</FormLabel>
        {errors.email ? (
          <Box>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <OutlinedInput
                  error
                  color="secondary"
                  {...field}
                  sx={{
                    borderRadius: 18,
                    width: 550,
                  }}
                />
              )}
            />
            <span className="errorMsg">{errors.email?.message}</span>
          </Box>
        ) : (
          <Box>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <OutlinedInput
                  color="secondary"
                  {...field}
                  sx={{
                    borderRadius: 18,
                    width: 550,
                  }}
                />
              )}
            />
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            marginTop: '15px',
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
