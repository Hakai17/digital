import { useQuery } from "@tanstack/react-query";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

import { SelectField } from "../../../../components";
import { DEFAULT_VALUE_STRING } from "../../../../components/constans";
import { get } from "../../../../utils/api";
import { Container } from "./styles";

export const FieldsSearchProduct = () => {
  const { values, setFieldValue } = useFormikContext();
  const [productId, setProductId] = useState(DEFAULT_VALUE_STRING);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => get("/produto/listar?somenteAtivo=true"),
  });

  useEffect(() => {
    if (productId !== DEFAULT_VALUE_STRING)
      setFieldValue("produtoId", productId);
  }, [productId]);

  return (
    <Container>
      <SelectField
        fullWidth
        options={products}
        getDescription={item => item.id}
        value={values.produtoId}
        onChange={e => setProductId(e.target.value)}
        label="Código Produto"
        size="small"
        name="produtoId"
      />

      <SelectField
        fullWidth
        options={products}
        value={values.produtoId}
        onChange={e => setProductId(e.target.value)}
        label="Nome Produto"
        size="small"
      />
    </Container>
  );
};
