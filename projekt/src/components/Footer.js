import Link from "next/link";
import Image from "next/image";
import { FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/icon.png" alt="SwapHub logo" width={28} height={28} className="h-7 w-7" />
              <span className="font-semibold text-gray-900">SwapHub</span>
            </div>
            <div className="flex items-center gap-3 text-xl text-gray-700">
              <a href="" className="hover:opacity-75"> <FaXTwitter /> </a>
              <a href="" className="hover:opacity-75"> <FaInstagram /> </a>
              <a href="" className="hover:opacity-75"> <FaYoutube /> </a>
              <a href="" className="hover:opacity-75"> <FaLinkedin /> </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About SwapHub</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Community guidelines</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Our mission</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Success stories</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Discover</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Browse categories</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Popular swaps</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Upcoming events</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Featured items</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Local groups</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Safety tips</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">FAQs</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Report an issue</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Feedback</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}


