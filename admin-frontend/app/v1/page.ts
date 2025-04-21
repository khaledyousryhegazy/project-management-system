// app/v1/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function V1Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/v1/dashboard");
  } else {
    redirect("/login");
  }

  return null;
}
