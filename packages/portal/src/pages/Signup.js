import { Container } from '@mui/system';
import Header from '../components/Header';
import InputField from '../components/InputField';
import InputButton from '../components/InputButton';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

const Signup = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <Container maxWidth="sm">
      <Box mt={20} mb={5}>
        <Header
          heading="Create An Account"
          desc="Already have an account? "
          link="Log in"
        />
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <InputField name="email" control={control} />
        <InputField name="password" control={control} />
        <InputButton name="Create An Account" control={control} />
      </Box>
    </Container>
  );
};

export default Signup;
