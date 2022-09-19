import { Container } from "@mui/system";
import Header from "../components/Header";
import InputField from "../components/InputField";
import InputButton from "../components/InputButton";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Alert from "@mui/material/Alert";

const Signup = () => {
  const [data, setData] = useState();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await axios.post(
      "http://localhost:5000/user/signup",
      data
    );
    console.log(response.data);
    setData(response.data);
  };

  return (
    <Container maxWidth="sm">
      {data && (
        <div>
          {data.message !== undefined && (
            <Alert severity="error">{data?.message}</Alert>
          )}

          {data === "undefined Account Already Exists" && (
            <Alert severity="error">Already Exists</Alert>
          )}
        </div>
      )}

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
