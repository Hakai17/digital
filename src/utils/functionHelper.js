export const maybeCallback =
  callback =>
  (...params) => {
    !!callback && typeof callback === "function" && callback(...params);
  };

export const ApplyMaskCnpj = cnpj => {
  if (cnpj.length > 18) return cnpj.substring(0, 18);
  cnpj = cnpj.replace(/\D/g, "");
  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
  return cnpj;
};

export const ApplyMaskCpf = cpf => {
  if (cpf.length > 14) return cpf.substring(0, 14);
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
};

export const OnlyNumber = value => {
  if (value.length > 10) return value.substring(0, 10);
  value = value.replace(/\D/g, "");
  return value;
};

export const ApplyMaskPhone = tel => {
  if (tel.length > 9) return tel.substring(0, 9);
  tel = tel.replace(/\D/g, "");
  // tel = tel.replace(/^(\d)/,"($1");
  // tel = tel.replace(/(.{3})(\d)/,"$1)$2");
  // if(tel.length == 9) {
  //   tel = tel.replace(/(.{1})$/,"-$1");
  // } else if (tel.length == 10) {
  //   tel = tel.replace(/(.{2})$/,"-$1");
  // } else if (tel.length == 11) {
  //   tel = tel.replace(/(.{3})$/,"-$1");
  // } else if (tel.length == 12) {
  //   tel = tel.replace(/(.{4})$/,"-$1");
  // } else if (tel.length > 12) {
  //   tel = tel.replace(/(.{4})$/,"-$1");
  // }
  return tel;
};

export const ApplyMaskDDD = ddd => {
  if (ddd.length > 2) return ddd.substring(0, 2);
  ddd = ddd.replace(/\D/g, "");
  return ddd;
};

export const ApplyMaskCep = cep => {
  cep = cep.replace(/\D/g, "");
  // cep = cep.replace(/^(\d{2})(\d)/,"$1.$2");
  // cep = cep.replace(/\.(\d{3})(\d)/,".$1-$2");
  return cep;
};

export const ApplyMaskHours = hour => {
  if (hour.length > 5) return hour.substring(0, 5);

  hour = hour.replace(/\D/g, "");
  hour = hour.replace(/(\d{2})(\d)/, "$1:$2");
  return hour;
};
