"use client";
import { useState, useEffect, useCallback } from "react";
import { getUserListings, createSwapRequest } from "@/lib/api/listings";
import Image from "next/image";
export default function SwapRequestModal({
  isOpen,
  onClose,
  targetListing,
  userId,
  token,
}) {
  const [userListings, setUserListings] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const isOwnItem = targetListing?.swapperId === userId;

  const fetchUserListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const listings = await getUserListings(userId, token);
      setUserListings(listings);
    } catch (err) {
      setError("Failed to load your items. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    if (isOpen && userId && token && !isOwnItem) {
      fetchUserListings();
    }
  }, [isOpen, userId, token, isOwnItem, fetchUserListings]);

  const handleSubmit = async () => {
    if (!selectedItem) {
      setError("Please select an item to offer in exchange.");
      return;
    }
    try {
      setSubmitting(true);
      setError(null);

      const requestData = {
        userid: parseInt(userId),
        requestItem: parseInt(targetListing.id),
        offerItem: parseInt(selectedItem.id),
      };
      await createSwapRequest(requestData, token);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setSelectedItem(null);
      }, 2000);
    } catch (err) {
      setError("Failed to send swap request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Propose a Swap</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              You want to swap for:
            </h3>
            <div className="flex items-center gap-3">
              <Image
                src={targetListing.asset?.url || "/placeholder-image.svg"}
                alt={targetListing.title}
                width={60}
                height={60}
                className="object-cover rounded-lg"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {targetListing.title}
                </p>
                <p className="text-sm text-gray-600">
                  by {targetListing.swapperName}
                </p>
              </div>
            </div>
          </div>
          {isOwnItem && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-yellow-800 font-medium">
                  This is your own item - you cannot swap with yourself
                </p>
              </div>
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                Swap request sent successfully
              </p>
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          {!isOwnItem && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Select an item to offer in exchange:
              </h3>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading your items...</p>
                </div>
              ) : userListings.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  <p>You don&apos;t have any items listed yet.</p>
                  <p className="text-sm mt-1">
                    List an item first to propose swaps!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {userListings.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedItem?.id === item.id
                          ? "border-green-700 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.asset?.url || "/placeholder-image.svg"}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedItem || submitting || isOwnItem}
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {submitting
                ? "Sending..."
                : isOwnItem
                ? "Cannot Swap Own Item"
                : "Send Swap Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
