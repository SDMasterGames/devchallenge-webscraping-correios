import { getCepForm } from "./Form";
import { getCepScraping } from "./Scraping";

export const baseURL = "https://buscacepinter.correios.com.br/app/endereco";
export const CEP = "01153000";

async function main() {
  /* const result = await getCepForm({
    cep: CEP,
  }); */

  const result = await getCepScraping({ cep: CEP });
  return result;
}

main().then(x => console.log(x));
