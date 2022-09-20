import { Container } from '@mui/system';
import React from 'react';
import NavBarX from '../components/NavBarX';
import Comment from '../components/Comment';
import { Box } from '@mui/material';
import ArticleBig from '../components/ArticleBig';
// import InputField from '../components/InputField';
// import InputButton from '../components/InputButton';
// import { useForm } from 'react-hook-form';
import AddComment from '../components/AddComment';

const ArticleDetail = () => {
  // const { handleSubmit, control } = useForm({
  //   defaultValues: { comment: '' },
  // });
  // const onSubmit = (data) => console.log(data);
  return (
    <>
      <NavBarX login={true} />
      <Container maxWidth="lg">
        <Box mb={5}>
          <ArticleBig />
        </Box>
        <Box>
          <AddComment />
        </Box>
        <Box mt={3}>
          <Comment count={4} />
          <Comment count={4} />
        </Box>
      </Container>
    </>
  );
};

export default ArticleDetail;
