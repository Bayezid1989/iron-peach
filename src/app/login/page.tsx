import CompanyLogo from "@/components/company-logo";
import ProviderLogins from "@/components/auth/provider-logins";
import { isAuthenticated } from "@/lib/firebase-admin/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  if (await isAuthenticated()) redirect("/lobby");

  return (
    <main className="container flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
      <div className="flex flex-col items-center">
        <CompanyLogo className="w-20 h-20" />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-slate-900 dark:text-slate-100">
          Log in to your account
        </h2>
      </div>
      <ProviderLogins />
    </main>
  );
}
