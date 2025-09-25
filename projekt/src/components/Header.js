import Link from "next/link";
import { isAuthed, logout } from "@/lib/actions/auth";

export default async function Header() {
   const authed = await isAuthed();
 return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/icon.png" alt="SwapHub" className="h-7 w-7" />
            <span className="font-semibold text-gray-900">SwapHub</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            <Link href="/" className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
              Listings
            </Link>
         
           <Link   href={{ pathname: "/", hash: "contact" }}
            className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
              Contact
            </Link>
           <div className="ml-4 flex items-center gap-2">
              {authed ? (
                <>
                   <Link href="/community" className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
              Your Swap Requests
            </Link>
                  <form action={logout}>
                    <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                      Log out
                    </button>
                  </form>
                  <Link
                    href="/profile"
                    className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 font-medium transition-colors"
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 font-medium transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

         