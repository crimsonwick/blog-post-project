<<<<<<< HEAD
import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { AppContext } from '../App';
import { AppContextInterface, UserInterface } from '../interface/App';
import '../styles/dropzone.css';

interface ColorInterface {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
}
=======
import React, { useCallback, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { AppContext } from '../App'
import {
  AppContextInterface,
  UserInterface,
  ColorInterface,
  MyFile,
} from '../interface/App'
import '../styles/StyledDropZone.css'
>>>>>>> feature/modularity-dropzone

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
  height: 161px;
  font-family: Poppins;
  align-text: centre;
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
  const [myFile, setMyFile] = useState<MyFile[]>([])

  const context: AppContextInterface<UserInterface> | null = useContext(
    AppContext,
  )

  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      const file = acceptedFile[0]
      setMyFile(
        acceptedFile.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
      context?.setPostImage(file)
    },
    [context, myFile],
  )

  const removeFile = (file: MyFile) => () => {
    setMyFile([])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    multiple: false,
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
    },
  })

  const removeFileList = myFile.map((file_) => (
    // <li key={file_.path}>
    //   {file_.path} - {file_.size} bytes{" "}
    <button onClick={removeFile(file_)}>Remove File</button>
    ///* </li> */}
  ))

  const thumbs = myFile.map((file) => (
    <div
      key={file.name}
      className="thumb"
      style={{
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box',
      }}
    >
      <div
        className="thumbInner"
        style={{ display: 'flex', minWidth: 0, overflow: 'hidden' }}
      >
        <img
          src={file.preview}
          className="img"
          style={{ display: 'block', width: 'auto', height: '100%' }}
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  return (
<<<<<<< HEAD
    <Container {...getRootProps()}>
      <input {...getInputProps()} type='file' name='file' accept='image/*' />
      {isDragActive ? (
        <p className='autoMargin'>Drop the files here ...</p>
      ) : (
        <p className='autoMargin'>
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </Container>
  );
};
=======
    <div>
      <Container {...getRootProps()}>
        <input {...getInputProps()} type="file" name="file" accept="image/*" />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag 'n' drop file here, or click to select file</p>
        )}
      </Container>

      <div
        className="thumbsContainer"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 16,
        }}
      >
        {thumbs}
      </div>
      {removeFileList}
    </div>
  )
}
>>>>>>> feature/modularity-dropzone
