import {
  Avatar,
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { LinkSimpleHorizontal } from "@phosphor-icons/react";
import mimeDb from "mime-db";
import { useSnackbar } from "notistack";
import { IconButton } from "../../../components";
import { get } from "../../../utils/api";
import { Container, StyledList, TextList } from "../styles";

export const FieldAttachment = ({ files = [] }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDownloadFile = async file => {
    try {
      let b64Data = {};
      b64Data = await get(
        `/Anexo/Download?contatoId=${file.contatoId}&sequenciaId=${file.sequenciaId}&nomeArquivo=${file.nomeArquivo}`
      );
      const mimeType = detectMimeType(file.nomeArquivo);
      Download(b64Data, mimeType);
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
    }
  };

  const detectMimeType = nomeArquivo => {
    var extensionFile = nomeArquivo.split(".")[1];

    for (const ext in mimeDb) {
      const { extensions } = mimeDb[ext];

      if (extensions) {
        for (const extension of extensions) {
          if (extension === extensionFile) {
            return ext;
          }
        }
      }
    }

    return null;
  };

  const Download = (b64Data, type) => {
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    var blob = new Blob([byteArray], { type: type });
    var url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <Container container direction="column">
      <StyledList>
        {files.map((file, index) => (
          <ListItem
            key={index}
            secondaryAction={
              file.url ? (
                <IconButton
                  component={Link}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkSimpleHorizontal size={32} weight="bold" />
                </IconButton>
              ) : null
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <Avatar src={file?.preview} />
              </ListItemIcon>
              <TextList
                primary={file.nomeArquivo}
                onClick={() => handleDownloadFile(file)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </StyledList>
    </Container>
  );
};
