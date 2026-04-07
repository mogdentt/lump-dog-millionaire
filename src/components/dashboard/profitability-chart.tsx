"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercent } from "@/lib/utils";
import {
  mockProjects,
  getProjectProfitability,
  getProjectApprovedChangeOrders,
} from "@/data/mock";

function getProfitabilityColor(marginPercent: number): string {
  if (marginPercent >= 30) return "bg-emerald-500";
  if (marginPercent >= 15) return "bg-amber-500";
  return "bg-red-500";
}

function getStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: "success" | "warning" | "secondary" | "danger" }> = {
    ACTIVE: { label: "Active", variant: "success" },
    PLANNING: { label: "Planning", variant: "secondary" },
    ON_HOLD: { label: "On Hold", variant: "warning" },
    COMPLETED: { label: "Completed", variant: "success" },
    CANCELLED: { label: "Cancelled", variant: "danger" },
  };
  const info = map[status] ?? { label: status, variant: "secondary" as const };
  return <Badge variant={info.variant}>{info.label}</Badge>;
}

export function ProfitabilityChart() {
  const activeProjects = mockProjects.filter(
    (p) => p.status === "ACTIVE" || p.status === "PLANNING"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Profitability</CardTitle>
        <CardDescription>
          Internal cost incurred vs. total lump sum budget (including approved change orders)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {activeProjects.map((project) => {
          const stats = getProjectProfitability(project);
          const approvedCOs = getProjectApprovedChangeOrders(project.id);
          const color = getProfitabilityColor(stats.marginPercent);

          return (
            <div key={project.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{project.name}</h4>
                    {getStatusBadge(project.status)}
                  </div>
                  <p className="text-xs text-zinc-500">
                    {project.clientName} &middot; PM: {project.projectManagerName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {formatPercent(stats.marginPercent)} margin
                  </p>
                  <p className="text-xs text-zinc-500">
                    {formatCurrency(stats.profit)} profit
                  </p>
                </div>
              </div>

              {/* Budget bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>
                    Cost: {formatCurrency(stats.internalCost)}
                  </span>
                  <span>
                    Budget: {formatCurrency(stats.effectiveBudget)}
                    {approvedCOs > 0 && (
                      <span className="text-emerald-600 ml-1">
                        (+{formatCurrency(approvedCOs)} COs)
                      </span>
                    )}
                  </span>
                </div>
                <Progress
                  value={stats.burnPercent}
                  indicatorClassName={color}
                />
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>{formatPercent(stats.burnPercent)} burned</span>
                  <span>
                    {formatCurrency(stats.effectiveBudget - stats.internalCost)} remaining
                  </span>
                </div>
              </div>

              {/* Original vs effective budget breakdown */}
              {approvedCOs > 0 && (
                <div className="flex gap-4 text-xs">
                  <span className="text-zinc-400">
                    Original: {formatCurrency(project.totalLumpSum)}
                  </span>
                  <span className="text-zinc-400">
                    Contingency: {formatCurrency(project.contingencyBudget)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
