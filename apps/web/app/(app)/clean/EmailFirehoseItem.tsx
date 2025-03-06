"use client";

import { useState, useEffect } from "react";
import { Archive, Tag, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils";
import type { CleanThread } from "@/utils/redis/clean.types";
import { formatShortDate } from "@/utils/date";
import { LoadingMiniSpinner } from "@/components/Loading";

export function EmailItem({ email }: { email: CleanThread }) {
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNew(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center rounded-md border p-2 text-sm transition-all duration-300",
        isNew ? "bg-primary/5" : "bg-card",
        email.status === "processing" &&
          "border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20",
        email.status === "completed" &&
          "border-green-500/30 bg-green-50/50 dark:bg-green-950/20",
        email.action === "archive" && "border-green-500/30",
        email.action === "label" && "border-yellow-500/30",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center">
          <div
            className={cn(
              "mr-2 h-2 w-2 rounded-full",
              email.status === "processing" && "bg-blue-500",
              email.status === "completed" && "bg-green-500",
              email.action === "archive" && "bg-green-500",
              email.action === "label" && "bg-yellow-500",
              !email.action && !email.status && "bg-blue-500",
            )}
          />
          <div className="truncate font-medium">
            {email.status === "processing" && (
              <span className="mr-2 inline-flex items-center">
                <LoadingMiniSpinner />
              </span>
            )}
            {email.subject}
          </div>
        </div>
        <div className="truncate text-xs text-muted-foreground">
          From: {email.from} • {formatShortDate(email.date)}
        </div>
      </div>
      <div className="ml-2 flex items-center space-x-2">
        {email.action === "archive" && (
          <Archive className="h-3.5 w-3.5 text-green-500" />
        )}
        {email.action === "delete" && (
          <Trash className="h-3.5 w-3.5 text-red-500" />
        )}
        {email.action === "label" && (
          <div className="flex items-center">
            <Tag className="mr-1 h-3.5 w-3.5 text-yellow-500" />
            <Badge variant="outline" className="h-5 px-1 py-0 text-xs">
              {email.label}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
