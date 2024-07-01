import { PDFDownloadLink } from "@react-pdf/renderer";

export const PdfDownload = ({ idAtendimento, component }) => {
  return (
    <PDFDownloadLink
      style={{ textDecoration: "none", color: "#FFFFFF" }}
      document={component}
      fileName={`Atendimento_${idAtendimento}.pdf`}
    >
      {() => "Imprimir"}
    </PDFDownloadLink>
  );
};
