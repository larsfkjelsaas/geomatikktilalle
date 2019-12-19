import React from "react";
// Import the useDropzone hooks from react-dropzone
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import {
    fileUploaded
  } from "../../action-creators/actionCreator";

const FileUpload = ({ onDrop, accept }) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

const actions = {
    onDrop: fileUploaded
  };

export default connect(null, actions)(FileUpload);