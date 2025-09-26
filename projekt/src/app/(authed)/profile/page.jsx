import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/forms/ProfileForm";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const metadata = {
  title: "Your Profile",
  description: "Manage your profile",
};
export default async function ProfilePage() {
  const c = await cookies();
  const token = c.get("swaphub_token")?.value;
  const userId = c.get("swaphub_userid")?.value;
  if (!token || !userId) redirect("/login");
  if (!baseUrl) {
    redirect("/login");
  }
  const res = await fetch(`${baseUrl}/users/${userId}`, {
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) redirect("/login");
  const profileData = await res.json();

  const created = profileData.createdAt
    ? new Date(profileData.createdAt).toLocaleString()
    : "-";
  const updated = profileData.updatedAt
    ? new Date(profileData.updatedAt).toLocaleString()
    : "-";
  return (
    <div className="mx-auto max-w-3xl py-10 space-y-8">
      <section className="rounded-xl border border-gray-200 bg-white p-6 space-y-3">
        <h1 className="text-lg font-semibold text-gray-900">Your Profile</h1>
        <Detail label="User ID" value={profileData.id} />
        <Detail label="Email" value={profileData.email} />
        <Detail
          label="Name"
          value={`${profileData.firstname} ${profileData.lastname}`}
        />
        <Detail label="Member since" value={created} />
        <Detail label="Last updated" value={updated} />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <ProfileForm profileData={profileData} />
      </section>
      <div className="flex justify-center"></div>
    </div>
  );
}
function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 break-all">{String(value ?? "-")}</span>
    </div>
  );
}
