import { X } from "@phosphor-icons/react";
import { useSnackbar } from "notistack";
import { PdfDocumentAtendimento } from "..";
import { useBackdrop } from "../../contexts/BackdropContext";
import { PdfDownload } from "../PdfDownload/PdfDownload";
import { Button } from "../_UI/Button/Button";
import { IconButton } from "../_UI/IconButton/IconButton";
import { Modal, ModalClose } from "../_UI/Modal/Modal";
import {
  CodeValue,
  ContainerModal,
  Content,
  ContentModal,
  ContentModalHeader,
  Flex,
  FooterModal,
  GridModal,
  HeaderModal,
} from "./styles";

export function ModalPrintPdf({ open, handleChangeOpen, dataAttendance }) {
  const { enqueueSnackbar } = useSnackbar();
  const { open: openBackdrop, close } = useBackdrop();

  return (
    <Modal open={open}>
      <ContainerModal>
        <Content>
          <ContentModalHeader>
            <HeaderModal>Imprimir</HeaderModal>
            <ModalClose asChild>
              <IconButton onClick={handleChangeOpen}>
                <X size={26} weight="bold" color="white" />
              </IconButton>
            </ModalClose>
          </ContentModalHeader>
          <ContentModal>
            <GridModal>
              <Flex>
                <div>Código do atendimento:</div>
                <CodeValue>{dataAttendance.contatoId}</CodeValue>
              </Flex>
              <Flex>
                <div>Sequência: </div>
                <CodeValue>{dataAttendance.sequenciaId}</CodeValue>
              </Flex>
            </GridModal>
            <FooterModal>
              <Button>
                <PdfDownload
                  idAtendimento={dataAttendance.contatoId}
                  component={
                    <PdfDocumentAtendimento
                      idAtendimento={dataAttendance.contatoId}
                      enq={enqueueSnackbar}
                      sequenciaId={dataAttendance.sequenciaId}
                      openBackdrop={openBackdrop}
                      closeBackdrop={close}
                    />
                  }
                ></PdfDownload>
              </Button>
            </FooterModal>
          </ContentModal>
        </Content>
      </ContainerModal>
    </Modal>
  );
}
