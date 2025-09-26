"use client";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import profileAction from "./profileAction";
export default function ProfileForm({ profileData }) {
  const router = useRouter();
  const [formState, formAction, pending] = useActionState(profileAction, null);
  useEffect(() => {
    if (formState?.success) {
      toast.success("Profile updated successfully");
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    }
  }, [formState?.success, router]);
  return (
    <form action={formAction} className="space-y-4">
      <h2 className="text-base font-semibold text-gray-900">Edit profile</h2>
      {formState?.errors?.length > 0 && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {formState.errors[0]}
        </div>
      )}
      <div className="space-y-1">
        <label className="text-gray-900">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={profileData.email || ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
        <p className="text-orange-500 bg-white">
          {formState?.properties?.email?.errors}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-gray-900">First name</label>
          <input
            type="text"
            name="firstname"
            defaultValue={profileData.firstname || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <p className="text-orange-500 bg-white">
            {formState?.properties?.firstname?.errors}
          </p>
        </div>
        <div className="space-y-1">
          <label className="text-gray-900">Last name</label>
          <input
            type="text"
            name="lastname"
            defaultValue={profileData.lastname || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <p className="text-orange-500 bg-white">
            {formState?.properties?.lastname?.errors}
          </p>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-gray-900">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password here"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
        <p className="text-orange-500 bg-white">
          {formState?.properties?.password?.errors}
        </p>
      </div>
      <button
        type="submit"
        disabled={pending}
        className={`w-full rounded-lg bg-[#95D6A4] py-2.5 text-black ${
          pending ? "opacity-70" : ""
        }`}
      >
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
