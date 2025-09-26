import Image from "next/image";
import { getSingleListingDetails } from "@/lib/api/listings";
import ListingInfo from "@/components/listings/ListingInfo";
import RelatedItems from "@/components/RelatedItems";
export async function generateMetadata({ params }, parent) {
  const id = (await params).id;
  const singleListing = await getSingleListingDetails(id);
  return {
    title: singleListing.title,
    description: singleListing.description,
  };
}
export default async function ListingDetailsPage({ params }) {
  const id = (await params).id;
  const singleListing = await getSingleListingDetails(id);
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="order-2 lg:order-1">
            <Image
              src={singleListing.asset.url}
              alt={singleListing.title}
              width={400}
              height={400}
              className="object-contain h-[400px] w-[400px]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <ListingInfo singleListing={singleListing} />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12">
          <RelatedItems currentListing={singleListing} />
        </div>
      </div>
    </div>
  );
}
