import { ENVIRONMENTS } from "../constants/environments";
import { ICryto, ICrytoAPIResponse } from "../interfaces/cryto.interface";

export async function getAllCryto({ pageParam, limit = 25 }: any) {
  const response = await fetch(
    `${ENVIRONMENTS.API_URL}/tickers/?start=${pageParam}&limit=${limit}`
  );
  const data = (await response.json()) as ICrytoAPIResponse;
  return data;
}

export async function getCrytoById(id: string) {
  const response = await fetch(`${ENVIRONMENTS.API_URL}/ticker/?id=${id}`);
  const data = (await response.json()) as ICryto[];
  return data;
}
