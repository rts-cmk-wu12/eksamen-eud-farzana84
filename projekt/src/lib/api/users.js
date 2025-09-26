import fetchErrors from "../fetchErrors";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function getSingleUser(id, token) {
  if (!baseUrl) throw new Error("API_BASE_URL is not set");
  if (!id) throw new Error("Missing user id");
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}/users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  fetchErrors(res);
  return res.json();
}
