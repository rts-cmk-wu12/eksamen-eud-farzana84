import ToasterProvider from "@/components/ToasterProvider";
import SpecialHeader from "@/components/SpecialHeader";
export default function AuthedLayout({ children }) {
  return (
    <>
      <ToasterProvider />
      <SpecialHeader />
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </>
  );
}
