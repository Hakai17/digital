import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { StyledArrow, StyledContent } from "./styles";

function Content({ children, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledContent {...props}>
        {children}
        <StyledArrow />
      </StyledContent>
    </DropdownMenuPrimitive.Portal>
  );
}

export const Dropdown = DropdownMenuPrimitive.Root;
export const DropdownTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownContent = Content;
export const DropdownItem = DropdownMenuPrimitive.Item;
export const DropdownLabel = DropdownMenuPrimitive.Label;
export const DropdownSub = DropdownMenuPrimitive.Sub;
