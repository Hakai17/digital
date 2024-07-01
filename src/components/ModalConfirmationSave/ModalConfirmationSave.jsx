import { X } from "@phosphor-icons/react";
import { useSnackbar } from "notistack";
import { PdfDocumentAtendimento } from "../../components";
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

export function ModalConfirmationSave({
  open,
  handleChangeOpen,
  dataAttendance,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { open: openBackdrop, close } = useBackdrop();

  return (
    <Modal open={open}>
      <ContainerModal>
        <Content>
          <ContentModalHeader>
            <HeaderModal>Salvo com sucesso</HeaderModal>
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
                <CodeValue>{dataAttendance.idAtendimento}</CodeValue>
              </Flex>
              <Flex>
                <div>Tempo total foi: </div>
                <CodeValue>{dataAttendance.time}</CodeValue>
              </Flex>
            </GridModal>
            <FooterModal>
              <Button>
                <PdfDownload
                  idAtendimento={dataAttendance.idAtendimento}
                  component={
                    <PdfDocumentAtendimento
                      idAtendimento={dataAttendance.idAtendimento}
                      enq={enqueueSnackbar}
                      openBackdrop={openBackdrop}
                      closeBackdrop={close}
                    />
                  }
                ></PdfDownload>
              </Button>
              <Button>Enviar Email</Button>
            </FooterModal>
          </ContentModal>
        </Content>
      </ContainerModal>
    </Modal>
  );
}
