import puppeteer from "puppeteer";
import { baseURL } from "..";

interface getCepScrapingProps {
  cep: string;
  type?: string;
}

async function getCepScraping({ cep, type = "ALL" }: getCepScrapingProps) {
  const browser = await puppeteer.launch({
    devtools: true,
  });
  const page = await browser.newPage();
  await page.goto(baseURL + "/index.php");

  await page.type("#endereco", cep);
  await page.type("select[name=tipoCEP]", type);
  await page.click("#btn_pesquisar");

  await page.waitForTimeout(5000);

  const data = await page.$$eval("table tbody tr", (trs) => {
    return trs.map((tr) => {
      const tds = tr.querySelectorAll("td");
      return {
        logradouro: tds[0].textContent,
        bairro: tds[1].textContent,
        uf: tds[2].textContent,
        cep: tds[3].textContent,
      };
    });
  });
  await browser.close();
  if (data.length == 0) {
    throw new Error("CEP não encontrado");
  }
  return data;
}

export { getCepScraping };
