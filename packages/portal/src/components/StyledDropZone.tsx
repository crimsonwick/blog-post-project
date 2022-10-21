import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { AppContext } from "../App";
import { AppContextInterface, UserInterface } from "../interface/App";
import "../styles/

interface ColorInterface {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
}

const getColor = (props: ColorInterface) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
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
  border-color: ${(props: ColorInterface) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

interface MyFile {
  preview: string;
  name: string;
}

export const StyledDropZone = () => {
  const [myFile, setMyFile] = useState<MyFile[]>([]);

  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);

  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      const file = acceptedFile[0];
      setMyFile(
        acceptedFile.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      context?.setPostImage(file);
    },
    [context, myFile]
  );

  const removeFile = (file: MyFile) => () => {
    setMyFile([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    multiple: false,
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
  });

  const removeFileList = myFile.map((file_) => (
    // <li key={file_.path}>
    //   {file_.path} - {file_.size} bytes{" "}
    <button onClick={removeFile(file_)}>Remove File</button>
    ///* </li> */}
  ));

  const thumbs = myFile.map((file) => (
    <div key={file.name} className='thumb'>
      <div className="thumbInner">
        <img
          src={file.preview}
          className='img'
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div>
      <Container {...getRootProps()}>
        <input {...getInputProps()} type="file" name="file" accept="image/*" />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag 'n' drop file here, or click to select file</p>
        )}
      </Container>

      <div className='thumbsContainer'>{thumbs}</div>
      {removeFileList}
    </div>
  );
};

//resources:
//https://react-dropzone.js.org/#!/Previews
//https://stackoverflow.com/questions/56025690/how-to-remove-file-from-react-dropzone#:~:text=You%27ve%20probably%20already%20got,%2F%2F%20update%20the%20state%20%7D%3B
//https://react-dropzone.org/#!/Accepting%20specific%20file%20types