"use client";
// I have copied some code from my old project
import { useActionState, useEffect } from "react";
import { signUpAction } from "./signUpAction";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleLoader } from "react-spinners";
import Link from "next/link";
const override = {
  display: "block",
  margin: "0 auto",
};
export default function SignUpForm() {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(signUpAction, {});
  useEffect(() => {
    if (formState?.success) {
      toast.success("Your registration is successful");
      setTimeout(() => router.replace("/"), 1500);
    }
  }, [formState, router]);
  return isPending ? (
    <CircleLoader
      color="#95D6A4"
      loading={true}
      cssOverride={override}
      size={100}
    />
  ) : (
    <>
      <form
        action={formAction}
        className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-gray-900">First name</label>
            <input
              type="text"
              placeholder="Type your first name here"
              name="firstname"
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
              placeholder="Type your last name here"
              name="lastname"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <p className="text-orange-500 bg-white">
              {formState?.properties?.lastname?.errors}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-gray-900">Email</label>
          <input
            type="email"
            placeholder="Type your email here"
            name="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <p className="text-orange-500 bg-white">
            {formState?.properties?.email?.errors}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-gray-900">Password</label>
          <input
            type="password"
            placeholder="Create a password here"
            name="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <p className="text-orange-500 bg-white">
            {formState?.properties?.password?.errors}
          </p>
        </div>

        <div className="">
          <Button buttontext={"Register"} />
          <p className="text-orange-500 text-xl font-bold p-3 my-2">
            {formState?.errors}
          </p>
        </div>

        <p className="text-gray-900">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="text-green-700 underline">Sign in</span>
          </Link>
        </p>
      </form>
    </>
  );
}
