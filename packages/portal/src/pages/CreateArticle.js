import React, { useContext, useState, useCallback } from 'react';
import styles from '../styles/CreateArticle/CreateArticle.module.css';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addPost } from '../services/LoginApi';
import { useDropzone } from "react-dropzone";
import { Alerts } from '../components/Alerts';


const schema = yup
  .object({
    title: yup.string().required(),
    mins: yup.number().typeError('Must be a number').required(),
    body: yup.string().required(),
  })
  .required();

function CreateArticle() {
  const [image, setImage] = useState(null);
  const { userData, accessToken } = useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      body: '',
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let formData = new FormData();
      formData.append('userId', userData.id);
      formData.append('title', data.title);
      formData.append('body', data.body);
      formData.append('file', image);
      formData.append('timetoRead', data.mins);
      Alerts.success("Post Created successfully");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await addPost(formData, config);
      setTimeout(() => {

        navigate('/my-articles');

      }, 250)
    } catch (err) {
      Alerts.error("Something went Wrong");
    };
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(file);
  // };

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setImage(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    multiple: false,
    onDrop,
  });


  return (
    <>
      <NavBar login={true} />
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
                minRows={7}
                maxRows={7}
                size="large"
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

          <div {...getRootProps()}>
            <input
              {...getInputProps()}
              type="file"
              name="file"
              accept="image/*"
            />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <label className={styles.poppins}>Drag Files Here</label>
            )}
          </div>
          <br />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ borderRadius: '25px', fontSize: '22px', width: '350px' }}
          >
            Publish Article
          </Button>
        </form>
      </div>
    </>
  );
}

export default CreateArticle;