"use server";
// I have copied some code from my old project
import { z } from "zod";

export async function signUpAction(prevState, formData) {
  if (!formData) {
    return { success: false, errors: ["Form data is missing"] };
  }
  //console.log(formData);
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");
  const schema = z.object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });
  const validated = schema.safeParse({
    firstname,
    lastname,
    email,
    password,
  });

  if (!validated.success)
    return {
      ...validated,
      ...z.treeifyError(validated.error),
    };
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validated.data.email,
        password: validated.data.password,
        firstname: validated.data.firstname,
        lastname: validated.data.lastname,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        errors: [errorData?.message || "Sign up failed, please try again"],
      };
    }
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
}
