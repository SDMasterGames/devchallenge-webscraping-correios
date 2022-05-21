import axios from "axios";
import url from "node:url";
import { baseURL } from "../";

interface getCepFormProps {
  cep: string;
  type?: string;
}

async function getCepForm({ cep, type = "ALL" }: getCepFormProps) {
  try {
    const body = new url.URLSearchParams({ endereco: cep, tipoCEP: type });

    const { data } = await axios.post("/carrega-cep-endereco.php", body, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      baseURL,
    });

    if (data.erro || data.total == 0) {
      throw new Error("CEP não encontrado");
    }

    const result = data.dados.map((dado: any) => {
      return {
        logradouro: dado.logradouroDNEC,
        bairro: dado.bairro,
        uf: [dado.localidade,dado.uf].join('/'),
        cep: dado.cep,
      };
    });

    return result;
  } catch (error: any) {
    return error.message || "Erro ao buscar CEP";
  }
}

export { getCepForm };
