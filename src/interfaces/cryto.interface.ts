export interface ICrytoAPIResponse {
  data: ICryto[];
  info: Info;
}

export interface ICryto {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: null | string;
  msupply: null | string;
}
export type PercentChange = "1h" | "24h" | "7d";
export interface Info {
  coins_num: number;
  time: number;
}
