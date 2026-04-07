"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMilestones, mockProjects } from "@/data/mock";

const statusConfig: Record<
  string,
  { label: string; variant: "secondary" | "warning" | "default" | "success" }
> = {
  NOT_STARTED: { label: "Not Started", variant: "secondary" },
  IN_PROGRESS: { label: "In Progress", variant: "warning" },
  REVIEW: { label: "In Review", variant: "default" },
  APPROVED: { label: "Approved", variant: "success" },
};

export function MilestoneSummary() {
  // Show upcoming and in-progress milestones across all projects
  const activeMilestones = mockMilestones
    .filter((m) => m.status !== "APPROVED")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Milestones</CardTitle>
        <CardDescription>Active deliverables across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activeMilestones.map((milestone) => {
            const project = mockProjects.find((p) => p.id === milestone.projectId);
            const config = statusConfig[milestone.status];
            const dueDate = new Date(milestone.dueDate);
            const isOverdue = dueDate < new Date() && milestone.status !== "APPROVED";

            return (
              <div
                key={milestone.id}
                className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {milestone.title}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {project?.name} &middot; {milestone.percentageOfFee}% of fee
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <span
                    className={`text-xs ${
                      isOverdue ? "text-red-600 font-semibold" : "text-zinc-400"
                    }`}
                  >
                    {dueDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
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
