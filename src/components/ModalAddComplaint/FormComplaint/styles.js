import { styled } from "@mui/system";
import { AccordionMUI } from "../../_UI/AccordionMUI/AccordionMUI";

export const FirstAccordionMUI = styled(AccordionMUI)({
  borderRadius: "10px 10px 0 0 !important",
  "&.Mui-expanded:first-of-type": { borderRadius: "10px" },
});

export const LastAccordionMUI = styled(AccordionMUI)({
  borderRadius: "0 0 10px 10px !important",
});
