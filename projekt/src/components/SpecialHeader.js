import Link from "next/link";
import Image from "next/image";
export default function SpecialHeader() {
  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-around max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src="/icon.png" alt="SwapHub logo" width={28} height={28} className="h-7 w-7" />
          <span className="font-semibold text-gray-900">SwapHub</span>
        </div>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-[#95D6A4] text-gray-900 hover:bg-gray-200 font-medium transition-colors"
        >
          Back to listings
        </Link>
      </div>

    </header>
  )
}
