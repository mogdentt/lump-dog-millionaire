"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { mockChangeOrders, mockProjects } from "@/data/mock";

const statusConfig: Record<
  string,
  { label: string; variant: "warning" | "success" | "danger" }
> = {
  PENDING: { label: "Pending", variant: "warning" },
  APPROVED: { label: "Approved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
};

export function ChangeOrderSummary() {
  const recentOrders = [...mockChangeOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Orders</CardTitle>
        <CardDescription>Recent change orders across projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentOrders.map((co) => {
            const project = mockProjects.find((p) => p.id === co.projectId);
            const config = statusConfig[co.status];

            return (
              <div
                key={co.id}
                className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{co.title}</p>
                  <p className="text-xs text-zinc-500 truncate">
                    {project?.name} &middot;{" "}
                    {new Date(co.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {formatCurrency(co.addedCost)}
                    </p>
                    {co.addedDays > 0 && (
                      <p className="text-xs text-zinc-400">+{co.addedDays} days</p>
                    )}
                  </div>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
