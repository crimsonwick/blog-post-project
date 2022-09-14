import React from "react";
import styles from "../styles/CreateArticle/CreateArticle.module.css";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { OutlinedInput } from "@mui/material";

// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import FormControl from "@mui/material/FormControl";


import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().required(),
    mins: yup.number().required(),
    body: yup.string().required(),
  })
  .required();

function CreateArticle() {
 // const [min, setMin] = React.useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      //mins: "",
      body: "",
    },
    resolver: yupResolver(schema),
  });

  // const handleChange = (event) => {
  //   setMin(event.target.value);
  // };


  //
  
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <NavbarLoggedIn />
      <div className={styles.padding}>
        <h1 className={styles.headingOne}>Create New Article</h1>
        <Divider light />
        <br />
        <br />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.poppins}>Give it a title</label>

          <br />

          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
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
                  borderRadius: 5,
                  marginBottom: 3,
                  width: 700,
                  marginTop: 1,
                }}
                variant="outlined"
              />
            )}
          />
          {errors.title && <p>{errors.title.message}</p>}

          <br />

          <label className={styles.poppins}>Min. to read it</label>
          <br />
          <Controller
            control={control}
            name="mins"
            rules={{ required: true }}
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
                  borderRadius: 5,
                  marginBottom: 3,
                  width: 700,
                  marginTop: 1,
                }}
                variant="outlined"
              />
            )}
          />

          {/* <Controller
            control={control}
            name="mins"
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <FormControl>
                <Select
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                  onChange={handleChange}
                  checked={value}
                  inputRef={ref}
                  value={min}
                  displayEmpty
                  sx={{
                    borderRadius: 5,
                    marginBottom: 3,
                    width: 700,
                    marginTop: 1,
                  }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>one</MenuItem>
                  <MenuItem value={2}>two</MenuItem>
                  <MenuItem value={3}>more than 3</MenuItem>
                </Select>
              </FormControl>
            )}
          /> */}
          {errors.mins && <p>{errors.mins.message}</p>}

          <br />
          <br />

          <label className={styles.poppins}>Write something about it</label>
          <br />

          <Controller
            control={control}
            name="body"
            rules={{ required: true }}
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
                multiline
                maxRows={Infinity}
                sx={{
                  borderRadius: 5,
                  marginBottom: 3,
                  width: 700,
                  marginTop: 1,
                }}
              />
            )}
          />

          {errors.body && <p>{errors.body.message}</p>}

          <br />
          <br />

          <Button variant="contained" component="label" color="primary">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>

          {/* <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton> */}

          <br />
          <br/>
          <br/>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ borderRadius: "25px", fontSize: "22px", width: "350px" }}
          >
            Publish Article
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateArticle;