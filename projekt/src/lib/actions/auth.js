"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("swaphub_token");
  cookieStore.delete("swaphub_userid");
  redirect("/");
}
export async function isAuthed() {
  const cookieStore = await cookies();
  return !!(cookieStore.get("swaphub_token")?.value && cookieStore.get("swaphub_userid")?.value);
}
