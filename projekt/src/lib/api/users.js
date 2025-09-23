// src/lib/api/users.js
import fetchErrors from "../fetchErrors";

const baseUrl = process.env.API_BASE_URL;

export async function getSingleUser(id, token) {
  if (!baseUrl) throw new Error("API_BASE_URL is not set");
  if (!id) throw new Error("Missing user id");
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}/users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, // token string, not cookie object
    },
    cache: "no-store",
  });

  fetchErrors(res); // throws if !res.ok
  return res.json();
}


/*
export async function signupUserToClass({ classId, action, userId, token }) {
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/users/${userId}/classes/${classId}`,
      {
        method: action,
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      }
    );
    // Return raw Response (same as your original)
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
*/