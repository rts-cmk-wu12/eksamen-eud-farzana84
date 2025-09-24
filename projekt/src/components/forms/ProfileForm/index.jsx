"use client";
import { useActionState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import profileAction from "./profileAction";

export default function ProfileForm({ profileData }) {
  const [formState, formAction, pending] = useActionState(profileAction, null);
  const err = (name) => formState?.properties?.[name]?.errors?.[0];

  return (
    <form action={formAction} className="space-y-4">
      <h2 className="text-base font-semibold text-gray-900">Edit profile</h2>

      {formState?.errors?.length > 0 && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {formState.errors[0]}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <input
            name="firstname"
            defaultValue={profileData.firstname || ""}
            placeholder="First name"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            aria-invalid={!!err("firstname")}
          />
          {err("firstname") && (
            <p className="text-xs text-red-600">{err("firstname")}</p>
          )}
        </div>

        <div className="space-y-1">
          <input
            name="lastname"
            defaultValue={profileData.lastname || ""}
            placeholder="Last name"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            aria-invalid={!!err("lastname")}
          />
          {err("lastname") && (
            <p className="text-xs text-red-600">{err("lastname")}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <input
          name="email"
          type="email"
          defaultValue={profileData.email || ""}
          placeholder="Email"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          aria-invalid={!!err("email")}
        />
        {err("email") && <p className="text-xs text-red-600">{err("email")}</p>}
      </div>

      <div className="space-y-1">
        <input
          name="password"
          type="password"
          placeholder="Password (required to save changes)"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          aria-invalid={!!err("password")}
          required
        />
        {err("password") && (
          <p className="text-xs text-red-600">{err("password")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Button buttontext={pending ? "Saving..." : "Save changes"} />
        <Link
          href="/"
          className="block w-full rounded-lg border border-gray-300 py-2.5 text-center text-gray-800 hover:bg-gray-50"
        >
          Go home
        </Link>
      </div>
    </form>
  );
}
