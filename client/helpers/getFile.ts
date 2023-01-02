import axios, { AxiosResponse } from "axios";
import { IFile } from "../types";
const getFile = async (url: string) => {
  try {
    const response: AxiosResponse<IFile, any> = await axios.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};
export default getFile;
