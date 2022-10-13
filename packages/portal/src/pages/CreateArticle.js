import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormLabel, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AppContext } from '../App';
import { Alerts } from '../components/Alerts';
import NavBar from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { StyledDropZone } from '../components/StyledDropZone';
import { addPost } from '../services/LoginApi';
import styles from '../styles/CreateArticle/CreateArticle.module.css';

const schema = yup
  .object({
    title: yup.string().required(),
    mins: yup.number().typeError('Must be a number').required(),
    body: yup.string().required(),
  })
  .required();

const CreateArticle = () => {
  const { userData, accessToken, postImage } = useContext(AppContext);
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
      formData.append('file', postImage);
      formData.append('timetoRead', data.mins);
      Alerts.success('Post Created successfully');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await addPost(formData, config);
      setTimeout(() => {
        navigate('/my-articles');
      }, 250);
    } catch (err) {
      Alerts.error('Something went Wrong');
    }
  };

  return (
    <>
      <NavBar login={true} />
      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="Create New Article" />
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={3}>
          <FormLabel>Give it a title </FormLabel>
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

          <Box mt={2} mb={4}>
            <StyledDropZone />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              borderRadius: '25px',
              fontFamily: ['Poppins', 'serif'].join(','),
              fontSize: 18,
              width: '705px',
              height: '56px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}
          >
            Publish Article
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CreateArticle;
