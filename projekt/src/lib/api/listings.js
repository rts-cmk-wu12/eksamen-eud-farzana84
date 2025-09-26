import fetchErrors from "../fetchErrors";
//import { baseUrl } from "@/constant";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function getAllListings() {
  try {
    const response = await fetch(`${baseUrl}/listings`);
    fetchErrors(response);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
export async function getSingleListingDetails(listingId) {
  try {
    const response = await fetch(`${baseUrl}/listings/${listingId}`);
    fetchErrors(response);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
export async function getUserListings(userId, token) {
  try {
    const response = await fetch(`${baseUrl}/listings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    fetchErrors(response);
    const allListings = await response.json();
    const userListings = allListings.filter(
      (listing) => listing.userId === parseInt(userId)
    );
    return userListings;
  } catch (error) {
    throw new Error(error);
  }
}
export async function createSwapRequest(requestData, token) {
  try {
    const response = await fetch(`${baseUrl}/requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    fetchErrors(response);
    if (response.status === 204) {
      return { success: true };
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
