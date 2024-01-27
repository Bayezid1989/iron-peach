"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ResumeTablePagination({
  totalPages,
  page,
}: {
  totalPages: number;
  page: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string | null) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === null) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" disabled={page <= 1}>
        <Link
          href={createPageURL(page - 1)}
          className="flex h-full w-full items-center justify-center" // Not to use asChild to make disabled work
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" disabled={page >= totalPages}>
        <Link
          href={createPageURL(page + 1)}
          className="flex h-full w-full items-center justify-center" //Not to use asChild to make disabled work
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
