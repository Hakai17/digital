import { Link, ListItem, ListItemAvatar, Typography } from "@mui/material";
import {
  CheckCircle,
  Download,
  File,
  LinkSimpleHorizontal,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react";
import { IconButton } from "../../../../../../components";

import { useSnackbar } from "notistack";
import { CircularProgressWithLabel } from "../../../../../../components";
import { useDownloadAttachments } from "../../../../../../hooks/useDownloadAttachments";
import { THEME } from "../../../../../../theme";
import { CircularProgressCell, StyledAvatar, TextList } from "./styles";

export function AttachmentItem({ file, onRemove }) {
  const { enqueueSnackbar } = useSnackbar();
  const { downloadFile } = useDownloadAttachments({
    snackbar: enqueueSnackbar,
  });

  return (
    <ListItem
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
      <ListItemAvatar>
        <StyledAvatar src={file.preview}>
          <File size={23} />
        </StyledAvatar>
      </ListItemAvatar>

      <TextList
        primary={file.name}
        secondary={
          <Typography component="span" variant="body2">
            {file.readableSize}{" "}
          </Typography>
        }
        onClick={() => downloadFile(file)}
      />

      <CircularProgressCell container>
        {!file.uploaded && !file.error && (
          <CircularProgressWithLabel value={file.progress} />
        )}

        {file.uploaded && (
          <CheckCircle size={32} weight="fill" color={THEME.COLORS.SUCCESS} />
        )}

        {file.error && (
          <WarningCircle size={32} weight="fill" color={THEME.COLORS.ERROR} />
        )}
        <IconButton onClick={() => downloadFile(file)}>
          <Download size={32} color={THEME.COLORS.TEXT} />
        </IconButton>
        <IconButton onClick={() => onRemove(file.id)}>
          <Trash size={32} color={THEME.COLORS.ERROR} />
        </IconButton>
      </CircularProgressCell>
    </ListItem>
  );
}
