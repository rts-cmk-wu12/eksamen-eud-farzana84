import LoginForm from "@/components/forms/LoginForm";
export const metadata = {
  title: "Login",
  description: "Login to your account",
};
export default function LoginPage() {
  return (
    <div className="flex justify-center py-16">
      <LoginForm />
    </div>
  );
}
