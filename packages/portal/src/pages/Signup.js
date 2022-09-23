import { Container } from '@mui/system';
import Header from '../components/Header';
import InputField from '../components/InputField';
import InputButton from '../components/InputButton';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSignUpDetails } from '../services/LoginApi';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';


const reducer = (state,action) => {
  switch(action.type){
    case "FAILED": 
      return { Submitted: !state.Submitted, showMessage: state.showMessage }
    case "SUCCESS":
      return { Submitted: !state.Submitted, showMessage: !state.showMessage }
    default:
      return { Submitted: state.Submitted, showMessage: state.showMessage }
  }
}

const Signup = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });
  const [state,dispatch] = useReducer(reducer,{ Submitted: false, showMessage: false })
  const onSubmit = async(data) => {
    const responsed = await getSignUpDetails(data);
    if(responsed.data.id === undefined){
        dispatch({type: "FAILED"})
    }
    else{
      dispatch({type: "SUCCESS"})
      setTimeout(() => {
        navigate('/login')
      },1000)
    }
  }
  return (
    <Container maxWidth="sm">
      { ((state.Submitted && state.showMessage) && (<Alert severity="success">
  <AlertTitle> <strong>Account Created Successfully</strong></AlertTitle>
  You need to <strong> Login </strong>your Account Now!
</Alert>))} 
      {  ((state.Submitted && !state.showMessage) && (<Alert severity="error">
  <AlertTitle> <strong>Account Not Created</strong></AlertTitle>
  Try anyother email for  <strong> Sign Up </strong>your Account!
</Alert>))}
      <Box>
        <Header
          heading="Create An Account"
          desc="Already have an account? "
          link="/login"
        />
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <InputField
            name="email"
            labelAbove="What's your email?"
            control={control}
            placeholder="Enter your email address"
          />
          <p>{errors.email?.message}</p>
        </Box>
        <InputField
          name="password"
          labelAbove="Create a password"
          control={control}
          placeholder="Enter your password"
          labelBelow="Use 8 or more characters with a mix of letters, numbers & symbols"
        />
        <p>{errors.password?.message}</p>
        <Box mt={3}>
          <InputButton name="Create An Account" />
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
