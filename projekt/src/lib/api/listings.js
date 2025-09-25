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

export async function getUserListings(userId, token) {
  try {
    const response = await fetch(`${baseUrl}/listings`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    fetchErrors(response);
    const allListings = await response.json();

    // Filter to only show the user's own listings
    const userListings = allListings.filter(listing => listing.userId === parseInt(userId));

    return userListings;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Create a swap request
 */
export async function createSwapRequest(requestData, token) {
  try {
    const response = await fetch(`${baseUrl}/requests`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    fetchErrors(response);

    // Handle 204 No Content response (no JSON body)
    if (response.status === 204) {
      return { success: true };
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserRequests(userId, token) {
  try {
    const response = await fetch(`${baseUrl}/requests/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    fetchErrors(response);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteSwapRequest(requestId, token) {
  try {
    const response = await fetch(`${baseUrl}/requests/${requestId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    fetchErrors(response);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}


export async function createListing(listingData, token) {
  try {
    const response = await fetch(`${baseUrl}/listings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listingData),
    });
    fetchErrors(response);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}


export async function getCategories() {
  try {
    const response = await fetch(`${baseUrl}/categories`);
    fetchErrors(response);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}