import axios from "axios";
import { backendBaseUrl } from "@/shared/config";

export const apiClient = axios.create({
  baseURL: backendBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const GET = async (url) => {
  try {
    const response = await apiClient.get(url);
    return { data: response.data, response };
  } catch (error) {
    return { error: error.response.data, response: error.response };
  }
};
