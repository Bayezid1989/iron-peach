import ResumeTable from "@/components/lobby/resume-table";
import ResumeTableFooter from "@/components/lobby/resume-table-footer";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/server/firebase-admin/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams?: {
    page?: string;
  };
};

export default async function ResumePage({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-y-6">
      <header>
        <h1 className="text-2xl font-bold">Resume the past games</h1>
        <p>Start new game with your favorite setting!</p>
      </header>
      <div className="space-y-5">
        <Suspense
          fallback={Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] rounded" />
                    <Skeleton className="h-4 w-[200px] rounded" />
                  </div>
                </div>
                <Skeleton className="h-10 w-28 rounded" />
              </div>
            ))}
        >
          <ResumeTable page={page} userId={user.uid} />
        </Suspense>
        <Suspense>
          <ResumeTableFooter page={page} userId={user.uid} />
        </Suspense>
      </div>
    </div>
  );
}
