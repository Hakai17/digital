import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  StyledNavbarModal,
} from "./styles";

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalContent = DialogContent;
export const ModalOverlay = DialogOverlay;
export const ModalTitle = DialogTitle;
export const ModalDescription = DialogDescription;
export const ModalClose = DialogClose;
export const ModalPortal = DialogPrimitive.Portal;
export const NavbarModal = StyledNavbarModal;
