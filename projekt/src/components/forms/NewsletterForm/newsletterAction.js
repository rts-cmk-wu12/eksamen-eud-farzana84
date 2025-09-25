"use server";
import { baseUrl } from "@/constant";
export async function newsletterAction(prevState, formData) {
    const email = formData.get("email");
    const properties = {};

    if (!email || !isValidEmail(email)) {
        properties.email = { errors: "Please enter a valid email address" };
    }
     if (Object.keys(properties).length > 0) {
        return {
            success: false,
            properties,
            errors: "Please fix the errors above"
        };
    }
      try {
        const response = await fetch(`${baseUrl}/newsletter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.trim()
            })
        });

        if (response.status === 204) {
            return {
                success: true,
                message: "Successfully subscribed to newsletter!"
            };
        } else {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                errors: errorData.message || "Failed to subscribe. Please try again."
            };
        }
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return {
            success: false,
            errors: "Failed to subscribe. Please check your connection and try again."
        };
    }
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
