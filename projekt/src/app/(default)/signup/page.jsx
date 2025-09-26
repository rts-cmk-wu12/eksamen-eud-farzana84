import SignUpForm from "@/components/forms/SignUpForm";
export const metadata = {
  title: "Sign Up",
  description: "Create a new account",
};
export default function SignUpPage() {
  return (
    <div className="flex justify-center py-16">
      <SignUpForm />
    </div>
  );
}
