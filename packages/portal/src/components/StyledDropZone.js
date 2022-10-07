import React, { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { useCallback } from 'react';
import { AppContext } from '../App';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  width: 662px;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 25px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const StyledDropZone = (props) => {
  const { setPostImage } = useContext(AppContext);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setPostImage(file);
  }, [setPostImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    multiple: false,
    onDrop,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} type="file" name="file" accept="image/*" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </Container>
  );
};
