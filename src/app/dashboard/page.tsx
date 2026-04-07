import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProfitabilityChart } from "@/components/dashboard/profitability-chart";
import { MilestoneSummary } from "@/components/dashboard/milestone-summary";
import { ChangeOrderSummary } from "@/components/dashboard/change-order-summary";
import { InvoicingSummary } from "@/components/dashboard/invoicing-summary";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Project Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Overview of all lump sum projects, budgets, and profitability.
        </p>
      </div>

      {/* Summary stats */}
      <StatsCards />

      {/* Profitability tracking - main feature */}
      <ProfitabilityChart />

      {/* Two-column grid for milestones + change orders */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MilestoneSummary />
        <ChangeOrderSummary />
      </div>

      {/* Invoicing */}
      <InvoicingSummary />
    </div>
  );
}
