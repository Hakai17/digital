import { Radio, FormControl, FormControlLabel } from "@mui/material";
import { RadiosContainer } from "./styles";

export function BooleanField({
  defaultValue,
  affirmative,
  negative,
  onChange,
}) {
  return (
    <FormControl>
      <RadiosContainer defaultValue={defaultValue} onChange={onChange}>
        <FormControlLabel
          value={affirmative.id}
          control={<Radio />}
          label={affirmative.descricao}
        />
        <FormControlLabel
          value={negative.id}
          control={<Radio />}
          label={negative.descricao}
        />
      </RadiosContainer>
    </FormControl>
  );
}
