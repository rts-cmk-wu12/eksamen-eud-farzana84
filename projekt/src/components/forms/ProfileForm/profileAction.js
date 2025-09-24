"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl = process.env.API_BASE_URL;

export default async function profileAction(prev, formData) {
  const token  = cookies().get("swaphub_token")?.value;
  const userId = cookies().get("swaphub_userid")?.value;
  if (!token || !userId) return { errors: ["Please sign in to continue."] };
  const norm = (v) => {
    const s = (v ?? "").toString().trim();
    return s === "" ? undefined : s;
  };
  let current;
  try {
    const r = await fetch(`${baseUrl}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (!r.ok) return { errors: ["Could not load your profile. Try again."] };
    current = await r.json();
  } catch {
    return { errors: ["Network error loading profile. Try again."] };
  }

  const nextEmail     = norm(formData.get("email"));
  const nextFirstname = norm(formData.get("firstname"));
  const nextLastname  = norm(formData.get("lastname"));
  const nextPassword  = norm(formData.get("password")); 

  const body = {
    email:     nextEmail     ?? current.email     ?? "",
    firstname: nextFirstname ?? current.firstname ?? "",
    lastname:  nextLastname  ?? current.lastname  ?? "",
    password:  nextPassword  ?? "", 
  };
   const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    password: z.string().min(1, { message: "Password is required to save changes" }),
  });

  const validated = schema.safeParse(body);
  if (!validated.success) {
    return {
      ...validated,
      ...(z.treeifyError ? z.treeifyError(validated.error) : {
        properties: validated.error.flatten().fieldErrors,
      }),
    };
  }
  if (
    body.email === (current.email ?? "") &&
    body.firstname === (current.firstname ?? "") &&
    body.lastname === (current.lastname ?? "") &&
    !nextPassword
  ) {
    return { errors: ["No changes to update."] };
  }
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(async () => {
        const txt = await response.text().catch(() => "");
        return txt ? { message: txt } : null;
      });
      return { errors: [errorData?.message || "Update failed, please try again"] };
    }

    redirect("/profile");
  } catch {
    return { errors: ["Network error. Please try again."] };
  }
}
