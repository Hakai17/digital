import { TabPanel } from "@mui/lab";
import { Field, useFormikContext } from "formik";
import { useEffect } from "react";
import { ApplyMaskDDD, ApplyMaskPhone } from "../../../utils/functionHelper";
import { FormikTextField } from "../../_UI/FormikTextField/FormikTextField";
import { AlmostLargeTextField, SmallTextField } from "../styles";

export function ContactDataPanel({ telefoneConsumidor, ...props }) {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (telefoneConsumidor) {
      setFieldValue("telefoneWhatsApp", telefoneConsumidor);
    }
  }, [telefoneConsumidor]);

  return (
    <TabPanel {...props}>
      <Field
        name="dDDTelefone"
        component={SmallTextField}
        label="DDD"
        onChange={value =>
          setFieldValue(
            "dDDTelefone",
            ApplyMaskDDD(value.target.value.toString())
          )
        }
      />
      <Field
        name="telefone"
        component={AlmostLargeTextField}
        label="Telefone"
        onChange={value =>
          setFieldValue(
            "telefone",
            ApplyMaskPhone(value.target.value.toString())
          )
        }
      />
      <Field
        name="dDDCelular"
        component={SmallTextField}
        label="DDD"
        onChange={value =>
          setFieldValue(
            "dDDCelular",
            ApplyMaskDDD(value.target.value.toString())
          )
        }
      />
      <Field
        name="celular"
        component={AlmostLargeTextField}
        label="Celular"
        onChange={value =>
          setFieldValue(
            "celular",
            ApplyMaskPhone(value.target.value.toString())
          )
        }
      />
      <Field
        name="dDDFax"
        component={SmallTextField}
        label="DDD"
        onChange={value =>
          setFieldValue("dDDFax", ApplyMaskDDD(value.target.value.toString()))
        }
      />
      <Field
        name="fax"
        component={AlmostLargeTextField}
        label="Fax"
        onChange={value =>
          setFieldValue("fax", ApplyMaskPhone(value.target.value.toString()))
        }
      />
      <Field
        name="telefoneWhatsApp"
        component={FormikTextField}
        label="WhatsApp"
        disabled="true"
        // onChange={value =>
        //   setFieldValue(
        //     "telefoneWhatsApp",
        //     ApplyMaskPhone(value.target.value.toString())
        //   )
        // }
      />
      <Field
        name="email"
        component={FormikTextField}
        fullWidth
        label="E-mail"
        type="email"
        inputProps={{ maxLength: 50 }}
      />
      <Field
        name="site"
        component={FormikTextField}
        fullWidth
        label="Página Web"
        inputProps={{ maxLength: 50 }}
      />
    </TabPanel>
  );
}
