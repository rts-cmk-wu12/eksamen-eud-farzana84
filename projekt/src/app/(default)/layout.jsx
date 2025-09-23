// src/app/(default-layout)/layout.jsx
//import Header from "@/components/Header";
//import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";

export default function DefaultLayout({ children }) {
  return (
    <>
      <ToasterProvider />
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </>
  );
}
