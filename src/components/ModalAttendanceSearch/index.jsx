import { Button, CircularProgress } from "@mui/material";
import { ArrowLeft, X } from "@phosphor-icons/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { THEME } from "../../theme";
import { get } from "../../utils/api";
import { IconButton } from "../_UI/IconButton/IconButton";
import {
  Modal,
  ModalOverlay,
  ModalTitle,
  NavbarModal,
} from "../_UI/Modal/Modal";
import { ResponsesPreview } from "./ResponsesPreview";
import { SearchForm } from "./SearchForm";
import { TableAttendanceSearch } from "./TableAttendanceSearch";
import { CONTENT_TYPE } from "./constants";
import {
  ContentContainer,
  LoadingContainer,
  StyledModalContent,
} from "./styles";

export const ModalAttendanceSearch = ({
  callback,
  sequenceId,
  contactId,
  responses,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [searchId, setSearchId] = useState(null);
  const [contentType, setContentType] = useState(CONTENT_TYPE.LOADING);
  const queryClient = useQueryClient();

  const { data: searches } = useQuery({
    queryKey: ["attendanceSearchList", contactId, sequenceId],
    queryFn: () =>
      get(`/pesquisa/listar?contatoId=${contactId}&sequenciaId=${sequenceId}`),
  });

  const { data: selectedSearch } = useQuery({
    queryKey: ["attendanceSelectedSearch", searchId],
    queryFn: () => get(`/pesquisa/buscar?pesquisaId=${searchId}`),
    enabled: !!searchId,
    cacheTime: 0,
  });

  useEffect(() => {
    if (!!searches && contentType === CONTENT_TYPE.LOADING) {
      setContentType(CONTENT_TYPE.SEARCHES_LIST);
    }
  }, [open]);

  useEffect(
    () =>
      queryClient.removeQueries({
        queryKey: "attendanceSearchList",
        exact: true,
      }),
    [sequenceId]
  );
  useEffect(() => {
    if (!!searches && contentType === CONTENT_TYPE.LOADING) {
      setContentType(CONTENT_TYPE.SEARCHES_LIST);
    }

    if (!!selectedSearch && contentType === CONTENT_TYPE.LOADING) {
      if (
        !!responses &&
        responses.some(r => r.pesquisaId === selectedSearch.id)
      )
        setContentType(CONTENT_TYPE.SEARCH_ANSWERED);
      else setContentType(CONTENT_TYPE.SEARCH);
    }
  }, [searches, selectedSearch]);

  const selectSearch = id => {
    setContentType(CONTENT_TYPE.LOADING);
    setSearchId(id);
  };

  const onBackEvent = () => {
    setContentType(CONTENT_TYPE.LOADING);
    setSearchId(null);
  };

  return (
    <Modal open={open}>
      <Button onClick={() => setOpen(true)} {...props}>
        Pesquisa
      </Button>

      <ModalOverlay />
      <StyledModalContent>
        <NavbarModal>
          <div>
            {![CONTENT_TYPE.SEARCHES_LIST, CONTENT_TYPE.LOADING].includes(
              contentType
            ) && (
              <IconButton
                color={THEME.COLORS.TEXT_WHITE}
                onClick={() => onBackEvent()}
              >
                <ArrowLeft size={25} />
              </IconButton>
            )}
          </div>
          {CONTENT_TYPE.SEARCH && !!selectedSearch && (
            <ModalTitle>{selectedSearch.descricao}</ModalTitle>
          )}
          <IconButton
            color={THEME.COLORS.TEXT_WHITE}
            onClick={() => {
              onBackEvent();
              setOpen(false);
            }}
          >
            <X size={25} />
          </IconButton>
        </NavbarModal>
        <ContentContainer>
          {contentType === CONTENT_TYPE.SEARCHES_LIST && (
            <TableAttendanceSearch
              searches={searches}
              onSelectItem={selectSearch}
              showResponseStatus={!!contactId}
            />
          )}
          {contentType === CONTENT_TYPE.LOADING && (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          )}
          {contentType === CONTENT_TYPE.SEARCH && (
            <SearchForm
              questions={selectedSearch.perguntas}
              searchId={searchId}
              sequenceId={sequenceId}
              contactId={contactId}
              previousResponses={responses}
              callback={r => {
                callback(r);
                setContentType(CONTENT_TYPE.SEARCHES_LIST);
                setOpen(false);
              }}
            />
          )}
          {contentType === CONTENT_TYPE.SEARCH_ANSWERED && (
            <ResponsesPreview responses={responses} search={selectedSearch} />
          )}
        </ContentContainer>
      </StyledModalContent>
    </Modal>
  );
};
