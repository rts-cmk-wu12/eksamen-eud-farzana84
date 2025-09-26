import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
 weight: ["400", "600"],
});
export const metadata = {
  title: {
    default: "SwapHub",
    template: "%s | SwapHub",
  },
  description: "A web application for second-hand enthusiasts to buy and sell used items.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}







