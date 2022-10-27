import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormLabel, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AppContext } from '../context/AppContext';
import { Alerts } from '../components/Alerts';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { StyledDropZone } from '../components/StyledDropZone';
import { AppContextInterface, UserInterface } from '../interface/App';
import { addPost } from '../services/LoginApi';
import styles from '../styles/CreateArticle/CreateArticle.module.css';
import { dataInterface } from '../interface/App';
import '../styles/signup.css';

const schema = yup
  .object({
    title: yup.string().required(),
    mins: yup.number().positive().typeError('must be a number').required(),
    body: yup.string().required(),
    // file: yup.mixed().required('File is required')
  })
  .required();

const CreateArticle = () => {
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      body: '',
      mins: 0,
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('link', '/create-article');
  }, []);

  /**
   * On Submit Function.
   * @param data
   */
  const onSubmit = async (data: dataInterface) => {
    if (context?.postImage === null) {
      Alerts.error('Add an Image.');
    } else {
      if (
        context?.postImage?.type === 'image/png' ||
        context?.postImage?.type === 'image/jpg' ||
        context?.postImage?.type === 'image/jpeg'
      ) {
        try {
          let formData = new FormData();
          formData.append('userId', context?.userData.id as unknown as string);
          formData.append('title', data.title);
          formData.append('body', data.body);
          formData.append('file', context?.postImage as unknown as string);
          formData.append('timeToRead', data.mins as unknown as Blob);
          Alerts.success('Post Created successfully');
          const config = {
            headers: {
              Authorization: `Bearer ${context?.accessToken}`,
            },
          };
          await addPost(formData, config);
          setTimeout(() => {
            navigate('/articles');
          }, 250);
        } catch (err) {
          Alerts.error('Something went Wrong');
        }
      } else {
        Alerts.error('We only accept png/jpeg/jpg images');
      }
    }
  };

  return (
    <>
      <Navbar login={true} />
      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="Create New Article" />
        <Box mt={3}>
          <FormLabel
            htmlFor="form-label-above-title"
            sx={{ fontFamily: 'Poppins' }}
          >
            Give it a title
          </FormLabel>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {errors.title ? (
            <Box>
              <Controller
                control={control}
                name="title"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <OutlinedInput
                    error
                    onBlur={onBlur} // notify when input is touched
                    onChange={onChange} // send value to hook form
                    inputRef={ref}
                    sx={{
                      borderRadius: 5,
                      width: 700,
                      marginTop: 1,
                    }}
                    color="secondary"
                  />
                )}
              />
              <p className="errorMsg">{errors.title.message}</p>
            </Box>
          ) : (
            <Box>
              <Controller
                control={control}
                name="title"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <OutlinedInput
                    onBlur={onBlur} // notify when input is touched
                    onChange={onChange} // send value to hook form
                    inputRef={ref}
                    sx={{
                      borderRadius: 5,
                      marginBottom: 2.8,
                      width: 700,
                      marginTop: 1,
                    }}
                    color="secondary"
                  />
                )}
              />
            </Box>
          )}

          <Box mt={3}>
            <FormLabel
              htmlFor="form-label-above-title"
              sx={{ fontFamily: 'Poppins' }}
            >
              Min. to read
            </FormLabel>
          </Box>
          {errors.mins ? (
            <Box>
              <Controller
                control={control}
                name="mins"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <OutlinedInput
                    error
                    onBlur={onBlur} // notify when input is touched
                    onChange={onChange} // send value to hook form
                    inputRef={ref}
                    sx={{
                      borderRadius: 5,
                      width: 700,
                      marginTop: 1,
                    }}
                    color="secondary"
                  />
                )}
              />
              <p className="errorMsg"> {errors.mins.message}</p>
            </Box>
          ) : (
            <Box>
              <Controller
                control={control}
                name="mins"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <OutlinedInput
                    onBlur={onBlur} // notify when input is touched
                    onChange={onChange} // send value to hook form
                    inputRef={ref}
                    sx={{
                      borderRadius: 5,
                      width: 700,
                      marginBottom: 2.8,
                      marginTop: 1,
                    }}
                    color="secondary"
                  />
                )}
              />
            </Box>
          )}

          <Box mt={3}>
            <FormLabel
              htmlFor="form-label-above-title"
              sx={{ fontFamily: 'Poppins' }}
            >
              Write something about it
            </FormLabel>
          </Box>

          {errors.body ? (
            <Box>
              <Controller
                control={control}
                name="body"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <OutlinedInput
                    error
                    onBlur={onBlur} // notify when input is touched
                    onChange={onChange} // send value to hook form
                    inputRef={ref}
                    multiline
                    minRows={7}
                    maxRows={7}
                    sx={{
                      borderRadius: 5,
                      width: 700,
                      marginTop: 1,
                    }}
                    color="secondary"
                  />
                )}
              />
              <p className="errorMsg">{errors.body.message}</p>
            </Box>
          ) : (
            <Box>
              <Controller
                control={control}
                name="body"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <OutlinedInput
                    onBlur={onBlur} // notify when input is touched
                    onChange={onChange} // send value to hook form
                    inputRef={ref}
                    multiline
                    minRows={7}
                    maxRows={7}
                    sx={{
                      borderRadius: 5,
                      marginBottom: 2.8,
                      width: 700,
                      marginTop: 1,
                    }}
                    color="secondary"
                  />
                )}
              />
            </Box>
          )}

          <Box mt={2} mb={4}>
            <StyledDropZone />
            {/* {context && context.postImage && (
              <span className={styles.errorMsg}>Image is required</span>
            )} */}
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
