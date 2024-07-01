import mimeDb from "mime-db";
import { get } from "../utils/api";

export function useDownloadAttachments({ snackbar }) {
  const downloadFile = async file => {
    try {
      let b64Data = {};
      b64Data = await get(
        `/Anexo/Download?contatoId=${file.contatoId}&sequenciaId=${file.sequenciaId}&nomeArquivo=${file.name}`
      );
      const mimeType = detectMimeType(file.name);
      download(b64Data, mimeType, file.name);
    } catch (err) {
      snackbar(err, { variant: "error" });
    }
  };

  const downloadFileWhatsapp = async file => {
    try {
      let b64Data = {};
      b64Data = await get(`/anexo/downloadmediawpp?caminho=${file}`);

      const parts = file.split("/");
      const filename = parts.pop();
      const mimeType = detectMimeType(filename);
      download(b64Data, mimeType, filename);
    } catch (err) {
      snackbar(err, { variant: "error" });
    }
  };

  const detectMimeType = name => {
    var extensionFile = name.split(".")[1];

    for (const ext in mimeDb) {
      const { extensions } = mimeDb[ext];

      if (extensions) {
        for (const extension of extensions) {
          if (extension === extensionFile) {
            return ext;
          }
        }
      }
    }

    return null;
  };

  const download = (b64Data, type, name) => {
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    var blob = new Blob([byteArray], { type: type });
    var url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.dataset.downloadurl = [type, a.download, a.href].join(":");
    a.click();

    URL.revokeObjectURL(url); // cleanup
  };

  return { downloadFile, downloadFileWhatsapp };
}
