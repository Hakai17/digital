import { AttachmentItem } from "./AttachmentItem";
import { Container, StyledDropzone, StyledList } from "./styles";

export const Attachment = ({ uploadedFiles, handleUpload, onRemove }) => {
  return (
    <Container container direction="column">
      <StyledDropzone callback={handleUpload} />

      {!!uploadedFiles?.length && (
        <StyledList>
          {uploadedFiles.map((file, i) => (
            <AttachmentItem
              key={`${file.name}-${i}`}
              file={file}
              onRemove={onRemove}
            />
          ))}
        </StyledList>
      )}
    </Container>
  );
};
