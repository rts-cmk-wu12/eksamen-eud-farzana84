"use server";
import z from "zod";
import { cookies } from "next/headers";
import { logout } from "@/lib/actions/auth";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default async function profileAction(prevState, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("swaphub_token")?.value;
  const userId = cookieStore.get("swaphub_userid")?.value;
  if (!token || !userId)
    return { success: false, errors: ["Please sign in to continue."] };
  const {
    email = "",
    firstname = "",
    lastname = "",
    password = "",
  } = Object.fromEntries(formData);
  const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });
  const validated = schema.safeParse({ email, firstname, lastname, password });
  if (!validated.success)
    return {
      ...validated,
      ...z.treeifyError(validated.error),
      data: { email, firstname, lastname },
    };
  const url = `${baseUrl}/users/${userId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(validated.data),
      cache: "no-store",
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return {
        success: false,
        errors: [text || "Update failed, please try again"],
      };
    }
  } catch (err) {
    console.error("Network error calling:", url, err);
    return {
      success: false,
      errors: ["Network error. Check API_BASE_URL and server."],
    };
  }
  return { success: true, logout: await logout() };
}
