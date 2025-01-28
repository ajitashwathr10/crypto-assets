import { toast } from "sonner";

const BASE_URL = "https://api.coincap.io/v2";

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
  date: string;
}

export const fetchAssets = async (): Promise<Asset[]> => {
  try {
    const response = await fetch(`${BASE_URL}/assets`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    toast.error("Failed to fetch assets");
    return [];
  }
};

export const fetchAssetHistory = async (id: string): Promise<AssetHistory[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/assets/${id}/history?interval=h1`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    toast.error("Failed to fetch asset history");
    return [];
  }
};