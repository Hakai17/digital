import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export function MutipleField({ responses, onChange }) {
  return (
    <FormGroup>
      {responses.map(r => (
        <FormControlLabel
          key={r.id}
          control={
            <Checkbox
              onChange={e => onChange(e, r.id)}
              defaultChecked={!!r.dataResposta}
            />
          }
          label={r.descricao}
        />
      ))}
    </FormGroup>
  );
}
