/*import Link from "next/link";
import Image from "next/image";

export default function ListingCard({ singleListing }) {
 return (
    <Link href={`/item-detail/${singleListing.id}`} className="h-[300px] p-4 rounded-xl border items-center justify-center flex flex-col gap-2.5 border-gray-200 bg-white ">
   
           <Image
            src={singleListing.asset.url}
            alt={singleListing.title}
            width={200}
            height={200}
            className="h-40 w-40 object-contain"
            />
        
             <p className="px-5 pb-5 text-center text-gray-900">
            {singleListing.title}
             </p>
        
</Link>
  );
}
*/


import Link from "next/link";
import Image from "next/image";

export default function ListingCard({ singleListing }) {
  const { id, title = "Text" } = singleListing || {};
  const img = singleListing?.asset?.url || null;

  return (
    <Link
      href={`/listing-detail/${id}`}
      className="block rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-sm"
    >
      <div className="p-5">
      <div className="relative aspect-square w-full h-full rounded bg-gray-200 overflow-hidden">
          {img ? (
            <Image
              src={img}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain w-full h-full"
            />
            ) : (
            <div className="grid h-full w-full place-items-center">
              <div className="h-12 w-12 opacity-40 border rounded" />
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-900">{title}</p>
      </div>
    </Link>
  );
}

