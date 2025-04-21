"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useAuthentication from "@/store/authStore";
import Cookies from "js-cookie";
import { loginSchema } from "@/validations/authValidation";

export const useLogin = () => {
  const router = useRouter();
  const { login, loading } = useAuthentication();
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });

  const handleLogin = async (form: FormData) => {
    const data = {
      email: form.get("login-email") as string,
      password: form.get("login-password") as string,
    };

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setLoginErrors({
        email: errors.email?.[0] || "",
        password: errors.password?.[0] || "",
      });
      return;
    }

    const { success, token, error: loginError } = await login(data);

    if (!success) {
      toast(loginError || "Login failed", {
        icon: "❌",
        style: { color: "red" },
      });
      return;
    }

    toast("Login Successfully", { icon: "✅" });
    setLoginErrors({
      email: "",
      password: "",
    });
    Cookies.set("token", token, { expires: 7 });
    router.push("/v1/dashboard");
  };

  return { handleLogin, loading, loginErrors };
};
