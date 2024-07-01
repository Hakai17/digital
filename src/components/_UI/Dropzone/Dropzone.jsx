import { Typography } from "@mui/material";
import { filesize } from "filesize";
import { uniqueId } from "lodash";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { maybeCallback } from "../../../utils/functionHelper";
import { Container } from "./styles";

export const Dropzone = ({ callback, ...props }) => {
  const onDrop = useCallback(files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    maybeCallback(callback)(uploadedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Container {...getRootProps()} {...props}>
      <input {...getInputProps()} />
      <Typography color={!isDragActive && "black"}>
        {isDragActive
          ? "Solte os arquivos aqui"
          : "Clique ou arraste o arquivo para realizar o upload"}
      </Typography>
    </Container>
  );
};

Dropzone.propTypes = {
  callback: PropTypes.func,
  sx: PropTypes.object,
};
