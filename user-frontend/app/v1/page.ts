import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function V1Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/v1/projects");
  } else {
    redirect("/login");
  }
}
