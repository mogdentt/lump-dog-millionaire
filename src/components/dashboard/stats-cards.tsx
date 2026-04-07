"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  mockProjects,
  mockChangeOrders,
  getProjectInternalCost,
  getProjectEffectiveBudget,
} from "@/data/mock";
import { FolderOpen, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export function StatsCards() {
  const activeProjects = mockProjects.filter((p) => p.status === "ACTIVE");
  const totalBudget = activeProjects.reduce(
    (sum, p) => sum + getProjectEffectiveBudget(p),
    0
  );
  const totalCost = activeProjects.reduce(
    (sum, p) => sum + getProjectInternalCost(p.id),
    0
  );
  const totalProfit = totalBudget - totalCost;
  const pendingCOs = mockChangeOrders.filter((co) => co.status === "PENDING");

  const stats = [
    {
      title: "Active Projects",
      value: activeProjects.length.toString(),
      subtitle: `${mockProjects.length} total`,
      icon: FolderOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Budget",
      value: formatCurrency(totalBudget),
      subtitle: "Across active projects",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Profit",
      value: formatCurrency(totalProfit),
      subtitle: `${((totalProfit / totalBudget) * 100).toFixed(1)}% margin`,
      icon: TrendingUp,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Pending Change Orders",
      value: pendingCOs.length.toString(),
      subtitle: formatCurrency(pendingCOs.reduce((s, co) => s + co.addedCost, 0)),
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              {stat.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-zinc-500 mt-1">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
