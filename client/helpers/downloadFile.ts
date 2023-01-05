import axios, { AxiosResponse } from "axios";
import { IFile } from "../types";

const downloadFile = async (url: string) => {
  try {
    const response: AxiosResponse<IFile, any> = await axios.get(url, {
      responseType: "blob",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export default downloadFile;
