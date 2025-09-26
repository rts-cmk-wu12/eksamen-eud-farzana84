"use server";
// I have copied some code from "repetition ""
import { cookies } from "next/headers";
import { z } from "zod";

export async function loginAction(prevState, formData) {
  if (!formData) {
    return { success: false, errors: ["Form data is missing"] };
  }
  //console.log(formData);
  const email = formData.get("email");
  const password = formData.get("password");
  const cookieStore = await cookies();
  const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });
  const validated = schema.safeParse({
    email,
    password,
  });

  if (!validated.success)
    return {
      ...validated,
      ...z.treeifyError(validated.error),
    };
  const baseUrl = process.env.NEXT_PUBLIC_API_AUTH_URL;
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: validated.data.email,
        password: validated.data.password,
      }),
    });
    if (response.status !== 200)
      return {
        success: false,
        errors: ["Invalid email or password."],
      };
    const data = await response.json();
    cookieStore.set("swaphub_token", data.token, { maxAge: 60 * 30 * 60 });
    cookieStore.set("swaphub_userid", data.userId, { maxAge: 60 * 30 * 60 });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
}
