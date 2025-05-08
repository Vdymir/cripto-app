import { ENVIRONMENTS } from "../constants/environments";
import { ICrytoAPIResponse } from "../interfaces/cryto.interface";

export async function getAllCryto({ pageParam }: any) {
  const response = await fetch(
    `${ENVIRONMENTS.API_URL}/tickers/?start=${pageParam}&limit=25`
  );
  const data = (await response.json()) as ICrytoAPIResponse;
  return data;
}
