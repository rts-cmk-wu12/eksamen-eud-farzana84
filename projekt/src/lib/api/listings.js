import fetchErrors from "../fetchErrors";
import { baseUrl } from "@/constant";

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