"use server";
import { z } from "zod";
export async function newsletterAction(prevState, formData) {
  const email = formData.get("email");
  const schema = z.object({
    email: z.string().min(1, { message: "please enter a valid email address" }),
  });
  const validated = schema.safeParse({ email: email || "" });
  if (!validated.success) {
    const treeified = z.treeifyError(validated.error);
    return {
      ...validated,
      ...treeified,
    };
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const requestData = new FormData();
    requestData.append("email", validated.data.email);
    const response = await fetch(`${baseUrl}/newsletter`, {
      method: "POST",
      body: requestData,
    });
    if (response.status === 204) {
      return {
        success: true,
        message: "Successfully subscribed to newsletter!",
      };
    } else if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        errors: {
          general: [
            errorData?.message || "Failed to subscribe. Please try again.",
          ],
        },
      };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: {
        general: [
          "Failed to subscribe. Please check your connection and try again.",
        ],
      },
    };
  }
}
