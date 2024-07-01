import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export function RadioGroupField({ responses, onChange }) {
  return (
    <FormControl>
      <RadioGroup
        onChange={onChange}
        defaultChecked={responses.find(r => !!r.dataResposta)?.id}
      >
        {responses.map(r => (
          <FormControlLabel
            key={r.id}
            value={r.id}
            control={<Radio />}
            label={r.descricao}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
