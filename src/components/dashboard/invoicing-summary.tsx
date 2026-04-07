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
import {
  mockMilestones,
  mockProjects,
  getProjectEffectiveBudget,
} from "@/data/mock";

export function InvoicingSummary() {
  // Show milestones marked "Approved" that are ready to invoice
  const invoiceableMilestones = mockMilestones.filter(
    (m) => m.status === "APPROVED"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ready to Invoice</CardTitle>
        <CardDescription>
          Approved milestones ready for billing
        </CardDescription>
      </CardHeader>
      <CardContent>
        {invoiceableMilestones.length === 0 ? (
          <p className="text-sm text-zinc-500">No milestones ready for invoicing.</p>
        ) : (
          <div className="space-y-3">
            {invoiceableMilestones.map((milestone) => {
              const project = mockProjects.find(
                (p) => p.id === milestone.projectId
              );
              if (!project) return null;
              const effectiveBudget = getProjectEffectiveBudget(project);
              const invoiceAmount =
                (milestone.percentageOfFee / 100) * effectiveBudget;

              return (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50/50 p-3 dark:border-emerald-900 dark:bg-emerald-950/20"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">
                      {milestone.title}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {project.name} &middot; {milestone.percentageOfFee}% of fee
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      {formatCurrency(invoiceAmount)}
                    </p>
                    <Badge variant="success">Invoice</Badge>
                  </div>
                </div>
              );
            })}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Total invoiceable</span>
                <span className="font-semibold">
                  {formatCurrency(
                    invoiceableMilestones.reduce((sum, m) => {
                      const project = mockProjects.find(
                        (p) => p.id === m.projectId
                      );
                      if (!project) return sum;
                      return (
                        sum +
                        (m.percentageOfFee / 100) *
                          getProjectEffectiveBudget(project)
                      );
                    }, 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
