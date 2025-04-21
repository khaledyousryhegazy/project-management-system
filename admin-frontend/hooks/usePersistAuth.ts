"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import useAuthentication from "@/store/authStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export const usePersistAuth = () => {
  const { user, setUser } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (user) return;

    const token = Cookies.get("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data?.user);
        router.push("/v1");
      } catch (error) {
        const err = error as Error;
        toast(err.message);
        Cookies.remove("token");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router, setUser, user]);
};
