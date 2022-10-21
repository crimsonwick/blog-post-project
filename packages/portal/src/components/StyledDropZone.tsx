import React, { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { AppContext } from '../App'
import { AppContextInterface, UserInterface } from '../interface/App'
import { ColorInterface } from '../interface/App'
const getColor = (props: ColorInterface) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isFocused) {
    return '#2196f3'
  }
  return '#eeeeee'
}

const Container = styled.div`
  flex: 1;
  display: flex;
  width: 662px;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 25px;
  border-color: ${(props: ColorInterface) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`

export const StyledDropZone = () => {
  const context: AppContextInterface<UserInterface> | null = useContext(
    AppContext,
  )
  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      const file = acceptedFile[0]
      context?.setPostImage(file)
    },
    [context],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    multiple: false,
    onDrop,
  })

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} type="file" name="file" accept="image/*" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </Container>
  )
}
