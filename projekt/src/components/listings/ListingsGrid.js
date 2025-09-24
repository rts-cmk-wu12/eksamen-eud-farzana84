import ListingCard from "./ListingCard";

export default function ListingsGrid({ listings = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((singleListing) => (
        <ListingCard key={singleListing.id} singleListing={singleListing} />
      ))}
    </div>
  );
}
