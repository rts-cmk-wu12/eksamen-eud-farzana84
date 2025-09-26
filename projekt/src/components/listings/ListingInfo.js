"use client";
import { useState, useEffect } from "react";
import SwapRequestModal from "../SwapRequestModal";
export default function ListingInfo({ singleListing }) {
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const checkAuth = () => {
      const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("swaphub_token="));
      const userIdCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("swaphub_userid="));
      if (tokenCookie && userIdCookie) {
        setIsAuthenticated(true);
        setToken(tokenCookie.split("=")[1]);
        setUserId(userIdCookie.split("=")[1]);
      }
    };
    checkAuth();
  }, []);
  const handleSwapProposal = () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    setIsSwapModalOpen(true);
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {singleListing.title}
        </h1>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-gray-700 leading-relaxed">
            {singleListing.description}
          </p>
        </div>

        <div>
          <p className="text-gray-700 leading-relaxed">
            On SwapHub since: <span>{singleListing.createdAt}</span>
          </p>
        </div>
      </div>
      <div className="pt-4">
        <button
          onClick={handleSwapProposal}
          className="w-full py-4 px-6 bg-[#95D6A4] text-black rounded-lg text-lg font-semibold"
        >
          {isAuthenticated ? "Propose a swap" : "Login to propose a swap"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isAuthenticated
              ? "Select one of your items to propose a swap!"
              : "Login to propose a swap with your items!"}
          </p>
        </div>
      </div>
      {isSwapModalOpen && (
        <SwapRequestModal
          isOpen={isSwapModalOpen}
          onClose={() => setIsSwapModalOpen(false)}
          targetListing={singleListing}
          userId={userId}
          token={token}
        />
      )}
    </div>
  );
}
