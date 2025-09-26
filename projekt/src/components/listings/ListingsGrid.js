import ListingCard from "./ListingCard";
export default function ListingsGrid({ listings = [] }) {
  return (
    <div className="m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {listings.map((singleListing) => (
        <ListingCard key={singleListing.id} singleListing={singleListing} />
      ))}
    </div>
  );
}
