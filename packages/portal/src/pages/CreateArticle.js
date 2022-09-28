import React, { useContext, useState } from "react";
import styles from "../styles/CreateArticle/CreateArticle.module.css";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { AppContext } from "../App";
import Navbar from "../components/Navbar";
import { OutlinedInput } from "@mui/material";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addPost } from "../services/LoginApi";

const schema = yup
  .object({
    title: yup.string().required(),
    mins: yup.number().typeError("Must be a number").required(),
    body: yup.string().required(),
  })
  .required();

function CreateArticle() {
  const [image, setImage] = useState(null);
  const { userData, getAccessToken } = useContext(AppContext);
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

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("userId", userData.id);
    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("file", image);
    formData.append("timetoRead", data.mins);
    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
    };
    const response = await addPost(formData, config);
    console.log(response);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <Navbar login={true} />
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
                color="secondary"
              />
            )}
          />
          <br />
          {errors.title && (
            <span className={styles.errorMsg}>{errors.title.message}</span>
          )}

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
                color="secondary"
              />
            )}
          />
          <br />
          {errors.mins && (
            <span className={styles.errorMsg}>{errors.mins.message}</span>
          )}

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
                variant="outlined"
                color="secondary"
              />
            )}
          />

          <br />
          {errors.body && (
            <span className={styles.errorMsg}>{errors.body.message}</span>
          )}

          <br />
          <br />

          <Button variant="contained" component="label">
            Upload
            <input
              type="file"
              name="file"
              hidden
              onChange={(event) => handleFileChange(event)}
            />
          </Button>
          <br />
          <br />
          <br />
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
