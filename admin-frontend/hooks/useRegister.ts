"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useAuthentication from "@/store/authStore";
import { registerSchema } from "@/validations/authValidation";

export const useRegister = () => {
  const router = useRouter();
  const { register, loading } = useAuthentication();
  const [registerErrors, setRegisterErrors] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleRegister = async (form: FormData) => {
    const username = form.get("register-username") as string;
    const email = form.get("register-email") as string;
    const password = form.get("register-password") as string;
    const avatar = form.get("register-avatar") as File;

    const result = registerSchema.safeParse({
      username,
      email,
      password,
    });

    if (!avatar || avatar.size === 0) {
      setRegisterErrors((prev) => ({ ...prev, avatar: "Avatar is required" }));
      return;
    }

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setRegisterErrors({
        username: errors.username?.[0] || "",
        email: errors.email?.[0] || "",
        password: errors.password?.[0] || "",
        avatar: avatar ? "" : "Avatar is required",
      });
      return;
    }

    // Create actual FormData to send to backend
    const formDataToSend = new FormData();
    formDataToSend.append("username", username);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    formDataToSend.append("avatar", avatar);

    const { success, error: registerError } = await register(formDataToSend);

    if (!success) {
      toast(registerError || "Register failed", {
        icon: "❌",
        style: { color: "red" },
      });
      return;
    }

    toast("Register Successfully Created", { icon: "✅" });
    setRegisterErrors({ username: "", email: "", password: "", avatar: "" });
    router.push("/login");
  };

  return { handleRegister, loading, registerErrors };
};
