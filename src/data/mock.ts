// Mock data demonstrating the core entities and profitability tracking

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PROJECT_MANAGER" | "ENGINEER" | "CLIENT";
  hourlyRate: number;
}

export interface MockTimeEntry {
  id: string;
  userId: string;
  userName: string;
  projectId: string;
  hours: number;
  hourlyRate: number;
  description: string;
  date: string;
}

export interface MockMilestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  percentageOfFee: number;
  dueDate: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "REVIEW" | "APPROVED";
  sortOrder: number;
}

export interface MockChangeOrder {
  id: string;
  projectId: string;
  title: string;
  description: string;
  addedCost: number;
  addedDays: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedBy: string;
  createdAt: string;
}

export interface MockProject {
  id: string;
  name: string;
  clientName: string;
  description: string;
  totalLumpSum: number;
  contingencyBudget: number;
  startDate: string;
  endDate: string;
  status: "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED";
  projectManagerId: string;
  projectManagerName: string;
}

// ─── Users ───────────────────────────────────────────────────────────────────

export const mockUsers: MockUser[] = [
  { id: "u1", name: "Sarah Chen", email: "sarah@example.com", role: "ADMIN", hourlyRate: 200 },
  { id: "u2", name: "James Rivera", email: "james@example.com", role: "PROJECT_MANAGER", hourlyRate: 175 },
  { id: "u3", name: "Anika Patel", email: "anika@example.com", role: "PROJECT_MANAGER", hourlyRate: 175 },
  { id: "u4", name: "Marcus Johnson", email: "marcus@example.com", role: "ENGINEER", hourlyRate: 150 },
  { id: "u5", name: "Elena Kowalski", email: "elena@example.com", role: "ENGINEER", hourlyRate: 140 },
  { id: "u6", name: "David Kim", email: "david@example.com", role: "ENGINEER", hourlyRate: 130 },
  { id: "u7", name: "Lisa Thompson", email: "lisa@example.com", role: "ENGINEER", hourlyRate: 145 },
  { id: "u8", name: "Robert Chang", email: "robert@example.com", role: "CLIENT", hourlyRate: 0 },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const mockProjects: MockProject[] = [
  {
    id: "p1",
    name: "Highway Bridge Rehabilitation",
    clientName: "Metro Transit Authority",
    description: "Structural assessment and rehabilitation design for the Main St. overpass bridge, including seismic retrofitting.",
    totalLumpSum: 850000,
    contingencyBudget: 85000,
    startDate: "2025-09-01",
    endDate: "2026-06-30",
    status: "ACTIVE",
    projectManagerId: "u2",
    projectManagerName: "James Rivera",
  },
  {
    id: "p2",
    name: "Water Treatment Plant Expansion",
    clientName: "Clearwater Municipal District",
    description: "Design expansion of the existing water treatment facility to increase capacity by 40%.",
    totalLumpSum: 1200000,
    contingencyBudget: 120000,
    startDate: "2025-11-01",
    endDate: "2026-10-31",
    status: "ACTIVE",
    projectManagerId: "u3",
    projectManagerName: "Anika Patel",
  },
  {
    id: "p3",
    name: "Office Tower Foundation Design",
    clientName: "Pinnacle Developments",
    description: "Geotechnical investigation and foundation design for a 25-story office building.",
    totalLumpSum: 420000,
    contingencyBudget: 42000,
    startDate: "2026-01-15",
    endDate: "2026-07-15",
    status: "ACTIVE",
    projectManagerId: "u2",
    projectManagerName: "James Rivera",
  },
  {
    id: "p4",
    name: "Solar Farm Site Grading",
    clientName: "GreenField Energy",
    description: "Civil site design and grading plans for a 50MW solar installation.",
    totalLumpSum: 275000,
    contingencyBudget: 27500,
    startDate: "2026-03-01",
    endDate: "2026-08-31",
    status: "PLANNING",
    projectManagerId: "u3",
    projectManagerName: "Anika Patel",
  },
];

// ─── Milestones ──────────────────────────────────────────────────────────────

export const mockMilestones: MockMilestone[] = [
  // Highway Bridge (p1) – 100% fee allocated
  { id: "m1", projectId: "p1", title: "Site Investigation & Assessment", description: "Complete field survey and structural condition assessment", percentageOfFee: 15, dueDate: "2025-10-15", status: "APPROVED", sortOrder: 1 },
  { id: "m2", projectId: "p1", title: "Preliminary Design (30%)", description: "Develop preliminary rehabilitation design alternatives", percentageOfFee: 20, dueDate: "2025-12-15", status: "APPROVED", sortOrder: 2 },
  { id: "m3", projectId: "p1", title: "Detailed Design (60%)", description: "Complete detailed structural design and seismic analysis", percentageOfFee: 25, dueDate: "2026-02-28", status: "IN_PROGRESS", sortOrder: 3 },
  { id: "m4", projectId: "p1", title: "Final Design (90%)", description: "Finalize construction documents", percentageOfFee: 25, dueDate: "2026-04-30", status: "NOT_STARTED", sortOrder: 4 },
  { id: "m5", projectId: "p1", title: "Construction Support", description: "Provide engineering support during construction phase", percentageOfFee: 15, dueDate: "2026-06-30", status: "NOT_STARTED", sortOrder: 5 },

  // Water Treatment (p2)
  { id: "m6", projectId: "p2", title: "Existing Facility Assessment", description: "Audit current plant capacity and identify constraints", percentageOfFee: 10, dueDate: "2025-12-15", status: "APPROVED", sortOrder: 1 },
  { id: "m7", projectId: "p2", title: "Conceptual Design", description: "Develop expansion concept with process flow diagrams", percentageOfFee: 15, dueDate: "2026-02-15", status: "REVIEW", sortOrder: 2 },
  { id: "m8", projectId: "p2", title: "Preliminary Design", description: "Preliminary design documents and equipment specifications", percentageOfFee: 25, dueDate: "2026-05-15", status: "IN_PROGRESS", sortOrder: 3 },
  { id: "m9", projectId: "p2", title: "Detailed Design", description: "Complete construction-ready design documents", percentageOfFee: 30, dueDate: "2026-08-15", status: "NOT_STARTED", sortOrder: 4 },
  { id: "m10", projectId: "p2", title: "Bid Support & Construction Admin", description: "Support bidding process and construction oversight", percentageOfFee: 20, dueDate: "2026-10-31", status: "NOT_STARTED", sortOrder: 5 },

  // Office Tower (p3)
  { id: "m11", projectId: "p3", title: "Geotechnical Investigation", description: "Perform borings, lab testing, and geotechnical report", percentageOfFee: 30, dueDate: "2026-03-01", status: "IN_PROGRESS", sortOrder: 1 },
  { id: "m12", projectId: "p3", title: "Foundation Design", description: "Design deep foundation system", percentageOfFee: 40, dueDate: "2026-05-15", status: "NOT_STARTED", sortOrder: 2 },
  { id: "m13", projectId: "p3", title: "Construction Documents", description: "Final foundation construction drawings and specifications", percentageOfFee: 30, dueDate: "2026-07-15", status: "NOT_STARTED", sortOrder: 3 },
];

// ─── Time Entries ────────────────────────────────────────────────────────────

export const mockTimeEntries: MockTimeEntry[] = [
  // Highway Bridge (p1) – internal cost ~$390,000 so far
  { id: "t1", userId: "u2", userName: "James Rivera", projectId: "p1", hours: 120, hourlyRate: 175, description: "Project management & coordination", date: "2026-03-15" },
  { id: "t2", userId: "u4", userName: "Marcus Johnson", projectId: "p1", hours: 280, hourlyRate: 150, description: "Structural analysis and design", date: "2026-03-15" },
  { id: "t3", userId: "u5", userName: "Elena Kowalski", projectId: "p1", hours: 200, hourlyRate: 140, description: "Seismic assessment and retrofitting design", date: "2026-03-15" },
  { id: "t4", userId: "u6", userName: "David Kim", projectId: "p1", hours: 160, hourlyRate: 130, description: "CAD drafting and modeling", date: "2026-03-15" },
  { id: "t5", userId: "u7", userName: "Lisa Thompson", projectId: "p1", hours: 80, hourlyRate: 145, description: "Quality review and checking", date: "2026-03-15" },

  // Water Treatment (p2) – internal cost ~$268,000 so far
  { id: "t6", userId: "u3", userName: "Anika Patel", projectId: "p2", hours: 100, hourlyRate: 175, description: "Project management", date: "2026-03-15" },
  { id: "t7", userId: "u4", userName: "Marcus Johnson", projectId: "p2", hours: 180, hourlyRate: 150, description: "Process engineering and design", date: "2026-03-15" },
  { id: "t8", userId: "u5", userName: "Elena Kowalski", projectId: "p2", hours: 220, hourlyRate: 140, description: "Civil/structural design", date: "2026-03-15" },
  { id: "t9", userId: "u6", userName: "David Kim", projectId: "p2", hours: 140, hourlyRate: 130, description: "Drafting and BIM modeling", date: "2026-03-15" },

  // Office Tower (p3) – internal cost ~$72,500 so far
  { id: "t10", userId: "u2", userName: "James Rivera", projectId: "p3", hours: 40, hourlyRate: 175, description: "Project management", date: "2026-03-15" },
  { id: "t11", userId: "u7", userName: "Lisa Thompson", projectId: "p3", hours: 120, hourlyRate: 145, description: "Geotechnical analysis", date: "2026-03-15" },
  { id: "t12", userId: "u6", userName: "David Kim", projectId: "p3", hours: 60, hourlyRate: 130, description: "Field investigation coordination", date: "2026-03-15" },
];

// ─── Change Orders ───────────────────────────────────────────────────────────

export const mockChangeOrders: MockChangeOrder[] = [
  {
    id: "co1",
    projectId: "p1",
    title: "Additional Seismic Analysis",
    description: "Client requested evaluation of additional retrofit alternatives per updated seismic code.",
    addedCost: 45000,
    addedDays: 14,
    status: "APPROVED",
    submittedBy: "u2",
    createdAt: "2026-01-10",
  },
  {
    id: "co2",
    projectId: "p1",
    title: "Expanded Environmental Review",
    description: "Environmental agency requires expanded review scope for lead paint remediation plan.",
    addedCost: 22000,
    addedDays: 10,
    status: "PENDING",
    submittedBy: "u2",
    createdAt: "2026-03-01",
  },
  {
    id: "co3",
    projectId: "p2",
    title: "UV Disinfection System Addition",
    description: "Client added UV disinfection as an additional treatment step not in the original scope.",
    addedCost: 75000,
    addedDays: 21,
    status: "APPROVED",
    submittedBy: "u3",
    createdAt: "2026-02-15",
  },
  {
    id: "co4",
    projectId: "p2",
    title: "Emergency Generator Sizing Study",
    description: "Evaluate backup power requirements for expanded facility.",
    addedCost: 18000,
    addedDays: 7,
    status: "PENDING",
    submittedBy: "u3",
    createdAt: "2026-03-20",
  },
  {
    id: "co5",
    projectId: "p3",
    title: "Additional Boring Locations",
    description: "Geotechnical conditions require 4 additional deep borings at revised tower footprint.",
    addedCost: 32000,
    addedDays: 10,
    status: "APPROVED",
    submittedBy: "u2",
    createdAt: "2026-02-28",
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getProjectInternalCost(projectId: string): number {
  return mockTimeEntries
    .filter((t) => t.projectId === projectId)
    .reduce((sum, t) => sum + t.hours * t.hourlyRate, 0);
}

export function getProjectApprovedChangeOrders(projectId: string): number {
  return mockChangeOrders
    .filter((co) => co.projectId === projectId && co.status === "APPROVED")
    .reduce((sum, co) => sum + co.addedCost, 0);
}

export function getProjectEffectiveBudget(project: MockProject): number {
  return project.totalLumpSum + getProjectApprovedChangeOrders(project.id);
}

export function getProjectMilestones(projectId: string): MockMilestone[] {
  return mockMilestones
    .filter((m) => m.projectId === projectId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProjectChangeOrders(projectId: string): MockChangeOrder[] {
  return mockChangeOrders.filter((co) => co.projectId === projectId);
}

export function getProjectProfitability(project: MockProject) {
  const internalCost = getProjectInternalCost(project.id);
  const effectiveBudget = getProjectEffectiveBudget(project);
  const profit = effectiveBudget - internalCost;
  const marginPercent = effectiveBudget > 0 ? (profit / effectiveBudget) * 100 : 0;
  const burnPercent = effectiveBudget > 0 ? (internalCost / effectiveBudget) * 100 : 0;

  return {
    internalCost,
    effectiveBudget,
    profit,
    marginPercent,
    burnPercent,
  };
}
