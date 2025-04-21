import { ILoginData } from "@/interfaces/authInterfaces";
import axios from "axios";

export const loginUser = async (data: ILoginData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
      data
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
    throw new Error("Something went wrong");
  }
};

export const registerUser = async (data: FormData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/register`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Register failed");
    }
    throw new Error("Something went wrong");
  }
};
