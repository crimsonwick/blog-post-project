import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import { Box } from '@mui/material';
import InputButton from './InputButton';

const AddComment = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: { comment: '' },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Box display="flex" gap={2} alignItems="flex-end">
      <Box>
        <InputField
          name="comment"
          control={control}
          width="1000px"
          labelAbove="Add Comment"
        />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', allignItems: 'centre', marginTop: '5px' }}
      >
        <InputButton name="Post" width="100px" />
      </Box>
    </Box>
  );
};

export default AddComment;
