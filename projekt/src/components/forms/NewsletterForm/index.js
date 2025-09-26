"use client";
import { useActionState, useEffect } from "react";
import { newsletterAction } from "./newsletterAction";
import Button from "@/components/Button";
import { toast } from "sonner";
import { CircleLoader } from "react-spinners";
const override = {
    display: "block",
    margin: "0 auto",
};
export default function NewsletterForm() {
    const [formState, formAction, isPending] = useActionState(newsletterAction, {});

    useEffect(() => {
        if (formState?.success) {
            toast.success("Successfully subscribed to newsletter!");
        }
    }, [formState]);
   return isPending ? (
        <CircleLoader
            color="#95D6A4"
            loading={true}
            cssOverride={override}
            size={50}
        />
    ) : (
        <form action={formAction} className="w-full  rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
                Subscribe to our newsletter for the latest updates and offers.
            </p>
           <div className="space-y-1">
                <label className="text-gray-900 font-medium">Email Address</label>
                <input
                    type="email"
                    placeholder="Type your email here"
                    name="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-orange-500 text-sm">
                    {formState?.properties?.email?.errors}
                </p>
            </div>
             <div className="">
                <Button buttontext="Subscribe" />
                <p className="text-orange-500 text-sm font-medium p-2 my-2">
                    {formState?.errors}
                </p>
            </div>
        </form>
    );
}
