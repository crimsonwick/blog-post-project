import styles from '../styles/Login/Login.module.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import React,{useState} from 'react';
import FormLabel from '@mui/material/FormLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
 import {  useNavigate } from "react-router-dom";
import "../styles/signup.css"
import YupPassword from 'yup-password';
YupPassword(yup);



const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: ""
    },
    resolver: yupResolver(schema),
  });

//   const { parentTransfer,userToken } = useContext(AppContext);
  const [message,setMessage] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async(data) => {
    // const response = await getLoginDetails(data);
    // if(response.data.accessToken) {
    //   userToken(response.data.accessToken)
    //   const parsetoken = parseJwt(response.data.accessToken)
    //   parentTransfer(parsetoken.user);
       navigate('/login');
    // }else{
    //     setMessage(true);
    // }
  };

  return (
    <Container maxWidth="sm">
      {message && <p style={{color: "red"}}>Wrong Credentials</p>}
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
        {errors.email && <span className='errorMsg'>{errors.email.message}</span>}
        <br />

        <Button
          onClick={()=>{ errors.email ? alert('Something went wrong') : alert('Check email to reset password.') ; }}
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

export default Login;
