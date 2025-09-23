
"use client";

// I have copied some code from my old project

import { useActionState, useEffect } from "react";
import { loginAction } from "./loginAction";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleLoader } from "react-spinners";
import Link from "next/link";

const override = {
  display: "block",
  margin: "0 auto",
};

export default function  SignInForm() {
    const router = useRouter();
  const [formState, formAction, isPending] = useActionState(loginAction, {});

  useEffect(() => {
    if (formState?.success) {
      toast.success("You are signed in successfully");
      setTimeout(() => router.replace("/"), 1500); // 1.5s then home
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
    <form action={formAction} className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 space-y-4">
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
          placeholder="Type your password here"
          name="password"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
           <p className="text-orange-500 bg-white">
          {formState?.properties?.password?.errors}
        </p>
      </div>

        <div className="">
          <Button buttontext={"log ind"} />
          <p className="text-orange-500 text-xl font-bold p-3 my-2">
          {formState?.errors}
        </p>
        </div>


      <p className="text-gray-900">
          Not a member yet?{" "}
        <Link href={"/signup"}>
          <span className="text-green-700 underline">Sign up here</span>
        </Link>
      </p>
    </form>
    </>
  );
}
/*

"use client";

// I have copied some code from "repetition ""

import { useActionState, useEffect } from "react";
import { loginAction } from "@/actions/login";
import Button from "@/components/ui/button";
import { redirect } from "next/navigation";
import { CircleLoader } from "react-spinners";
import Link from "next/link";

const override = {
  display: "block",
  margin: "0 auto",
};

export default function ContactForm() {
  const [formState, formAction, isPending] = useActionState(loginAction, {});

  useEffect(
    function () {
      if (formState?.success) {
        redirect("/calendar");
      }
    },
    [formState]
  );

  return isPending ? (
    <CircleLoader
      color="#FFFFFF"
      loading={true}
      cssOverride={override}
      size={100}
    />
  ) : (
    <>
      <form
        action={formAction}
        className="w-full flex flex-col justify-center items-center"
      >
        <input
          type="text"
          placeholder="brugernavn"
          className="placeholder:text-slate-400 block bg-white w-[80%] border border-slate-300 rounded-[.2em] py-2 pl-4 pr-3 sm:text-sm mt-[.5em] mb-[1.5em]"
          name="username"
        />
        <p className="text-purple-900 bg-white">
          {formState?.properties?.username?.errors}
        </p>

        <input
          type="Password"
          name="password"
          placeholder="adgangskode"
          defaultValue={formState?.data?.password}
          className="placeholder:text-slate-400 bg-white w-[80%] border border-slate-300 rounded-[.2em] py-2 pl-4 pr-3 sm:text-sm mt-[.5em] mb-[2em]"
        />
        <p className="text-purple-900 bg-white">
          {formState?.properties?.password?.errors}
        </p>

        <div className="">
          <Button buttontext={"log ind"} />
        </div>

        <p className="text-purple-900 text-xl font-bold p-3 my-2">
          {formState?.errors}
        </p>
      </form>
      <h2 className="text-white text-md p-4">
        Not a member yet?{" "}
        <Link href={"/sign-up"}>
          <span className="text-purple-900">Sign up here</span>
        </Link>
      </h2>
    </>
  );
}



*/