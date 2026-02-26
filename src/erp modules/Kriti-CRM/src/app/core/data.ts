
import {
    Patient,
    LabJob,
    Lead,
    Opportunity,
    Campaign,
    ActivityLog,
    BaseRecord,
    ROLES,
    Invoice,
    Appointment
} from "./schema";

// --- HELPER TO GENERATE BASE RECORD ---
const createBase = (id: string, ownerId: string = "USR-001"): BaseRecord => ({
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "USR-001",
    updatedBy: "USR-001",
    isActive: true,
    ownerId,
    branchId: "BR-001", // Default Main Branch
    tags: []
});

// --- MOCK DATABASE ---

export const PATIENTS: Patient[] = [
    {
        ...createBase("PAT-1001"),
        mrn: "MRN-2024-001",
        fullName: "Amit Sharma",
        phone: "9876543210",
        gender: "Male",
        lifecycleStage: "Active",
        lastVisitDate: "2023-11-20",
        totalVisits: 8,
        totalRevenue: 24500,
        address: { street: "123 Main St", city: "Mumbai", state: "MH", pincode: "400001" }
    },
    {
        ...createBase("PAT-1002"),
        mrn: "MRN-2024-002",
        fullName: "Priya Singh",
        phone: "8765432109",
        gender: "Female",
        lifecycleStage: "VIP",
        lastVisitDate: "2023-11-18",
        totalVisits: 15,
        totalRevenue: 42000
    }
];

export const LAB_JOBS: LabJob[] = [
    {
        ...createBase("JOB-2001"),
        jobId: "JOB-2001",
        patientId: "PAT-1001",
        orderId: "ORD-5001",
        status: "In_Lab",
        priority: "High",
        technicianId: "TEC-001",
        prescription: {
            od: { sph: -2.0, cyl: -0.5, axis: 90, add: 0 },
            os: { sph: -1.5, cyl: 0, axis: 0, add: 0 },
            pd: 64
        },
        lensDetails: {
            type: "Progressive",
            material: "HighIndex",
            coating: ["Blue-Cut"],
            brand: "Essilor"
        },
        targetDeliveryDate: "2023-11-26",
        redoCount: 0
    },
    {
        ...createBase("JOB-2002"),
        jobId: "JOB-2002",
        patientId: "PAT-1002",
        orderId: "ORD-5002",
        status: "Ready",
        priority: "Normal",
        technicianId: "TEC-002",
        prescription: {
            od: { sph: 0, cyl: 0, axis: 0, add: 2.5 },
            os: { sph: 0, cyl: 0, axis: 0, add: 2.5 },
            pd: 62
        },
        lensDetails: {
            type: "SingleVision",
            material: "CR39",
            coating: ["Anti-Glare"],
            brand: "Zeiss"
        },
        targetDeliveryDate: "2023-11-24",
        actualDeliveryDate: "2023-11-24",
        redoCount: 0
    }
];

export const LEADS: Lead[] = [
    {
        ...createBase("LEAD-1001", "USR-002"), // Owned by Neha
        fullName: "Rajesh Verma",
        phone: "9123456789",
        email: "rajesh@email.com",
        source: "Website",
        interest: "Eye-Test",
        status: "New",
        leadScore: 45,
        nextFollowUpDate: "2026-02-12"
    },
    {
        ...createBase("LEAD-1002"),
        fullName: "Kavita Desai",
        phone: "9234567890",
        email: "kavita@email.com",
        source: "Walk-in",
        interest: "Spectacles",
        status: "Contacted",
        leadScore: 60,
        nextFollowUpDate: "2026-02-11"
    },
    {
        ...createBase("LEAD-1003", "USR-002"),
        fullName: "Sunil Mehta",
        phone: "9345678901",
        source: "Campaign",
        interest: "Surgery",
        status: "Appointment_Booked",
        leadScore: 85,
        nextFollowUpDate: "2026-02-15"
    }
];

export const OPPORTUNITIES: Opportunity[] = [
    {
        ...createBase("OPP-2001"),
        leadId: "LEAD-1001",
        name: "Premium Lens Package - Rajesh",
        stage: "New", // Mapped from "Open"
        amount: 15000,
        expectedCloseDate: "2026-02-20",
        probability: 60
    },
    {
        ...createBase("OPP-2002", "USR-003"), // Dr. Kirti
        leadId: "LEAD-1003",
        name: "Cataract Surgery - Sunil",
        stage: "Consultation", // Mapped from "In Discussion"
        amount: 45000,
        expectedCloseDate: "2026-03-01",
        probability: 75
    }
];

export const CAMPAIGNS: Campaign[] = [
    {
        ...createBase("CAM-5001"),
        name: "Diwali Vision Sale",
        type: "SMS",
        status: "Completed",
        startDate: "2025-10-15",
        endDate: "2025-11-05",
        budget: 5000,
        spent: 4500,
        leadsGenerated: 124,
        conversionCount: 89,
        roi: 340
    },
    {
        ...createBase("CAM-5002"),
        name: "Free Eye Checkup Drive",
        type: "Offline", // Walk-in Campaign
        status: "Active",
        startDate: "2026-02-01",
        endDate: "2026-02-28",
        budget: 2000,
        spent: 800,
        leadsGenerated: 98,
        conversionCount: 62,
        roi: 280
    }
];

export const ACTIVITIES: ActivityLog[] = [
    {
        ...createBase("ACT-1"),
        entityId: "LEAD-1001",
        entityType: "lead",
        type: "call_log",
        title: "Follow-up Call Completed",
        description: "Discussed appointment options and premium lens packages",
        actorId: "USR-002", // Neha
        metadata: { duration: 120 }
    },
    {
        ...createBase("ACT-2"),
        entityId: "LEAD-1001",
        entityType: "lead",
        type: "whatsapp_sent",
        title: "WhatsApp Message Sent",
        description: "Sent pricing details and product catalog",
        actorId: "USR-001", // Admin
        metadata: { template: "catalog_v1" }
    }
];

export const JOB_CARDS = [
    { id: "JOB-7821", patientId: "PAT-1001", patient: "Amit Sharma", procedure: "Cataract Surgery - Left Eye", status: "In Progress", priority: "High", date: "2026-02-11" },
    { id: "JOB-7822", patientId: "PAT-1002", patient: "Priya Singh", procedure: "LASIK Consultation", status: "Pending", priority: "Normal", date: "2026-02-12" },
    { id: "JOB-7823", patient: "Amit Kumar", procedure: "Retinal Screening", status: "Completed", priority: "Low", date: "2026-02-10" },
    { id: "JOB-7824", patient: "Sita Devi", procedure: "Glaucoma Follow-up", status: "On Hold", priority: "Normal", date: "2026-02-11" },
];

// --- CENTRAL STORE EXPORT ---
export const DB = {
    patients: PATIENTS,
    labJobs: LAB_JOBS,
    leads: LEADS,
    opportunities: OPPORTUNITIES,
    campaigns: CAMPAIGNS,
    activities: ACTIVITIES,
    jobCards: JOB_CARDS,
    // ... future additions
};

export const LEGACY_DATA = {
    "appointments": [
        { id: "APT-5001", patient: "Amit Sharma", doctor: "Dr. Kirti", type: "OPD", time: "10:30 AM", date: "2023-11-25", status: "Booked" },
        { id: "APT-5002", patient: "Priya Singh", doctor: "Dr. Kirti", type: "Optical", time: "11:45 AM", date: "2023-11-25", status: "Completed" },
    ],
    "technicians": [
        { id: "TEC-301", name: "Rajesh Kumar", skill: "Expert", activeJobs: 3, accuracy: "99.2%", status: "Active" },
        { id: "TEC-302", name: "Suresh P.", skill: "Intermediate", activeJobs: 1, accuracy: "97.5%", status: "Active" },
    ],
    "machines": [
        { id: "MAC-401", name: "ES-700 Edger", status: "Operational", health: 92, lastCal: "2023-10-15", nextDue: "2023-12-15" },
        { id: "MAC-402", name: "ME-1200", status: "In Use", health: 88, lastCal: "2023-11-01", nextDue: "2024-01-01" },
    ],
    "consumables": [
        { id: "CON-501", name: "CR-39 Clear Lenses", category: "Lenses", stock: 450, reorder: 100, supplier: "Essilor" },
        { id: "CON-502", name: "Polishing Compound", category: "Chemicals", stock: 12, reorder: 5, supplier: "Optical S." },
    ],
    "qc-checklist": [
        { id: "QC-8001", jobId: "JOB-2002", technician: "Suresh P.", status: "Pass", checkedBy: "Admin", date: "2023-11-24" },
    ],
    "billing": [
        { id: "INV-9001", patient: "Amit Sharma", total: 1250, paid: 1250, due: 0, status: "Paid", date: "2023-11-24" },
        { id: "INV-9002", patient: "Priya Singh", total: 800, paid: 0, due: 800, status: "Pending", date: "2023-11-24" },
    ],
    "opd": [
        { id: "OPD-101", token: "001", patient: "Rahul V.", doctor: "Dr. Kirti", status: "Waiting" },
        { id: "OPD-102", token: "002", patient: "Sita R.", doctor: "Dr. Kirti", status: "In Consultation" },
    ],
    "pharmacy": [
        { id: "MED-201", name: "Lubricating Drops", stock: 85, expiry: "2025-06", reorder: 20 },
        { id: "MED-202", name: "Antibiotic Gel", stock: 40, expiry: "2024-12", reorder: 10 },
    ],
    "remake-tickets": [
        { id: "RMK-001", jobId: "JOB-1980", issue: "Scratched Lens", technician: "Rajesh Kumar", status: "Open" },
    ],
    "calibration-logs": [
        { id: "CAL-001", machine: "ES-700", date: "2023-11-20", by: "Rajesh Kumar", status: "Success" },
    ],
    "vendors": [
        { id: "VEN-001", name: "Essilor India", contact: "Mr. Khanna", items: "Lenses", status: "Active" },
    ],
    "training-records": [
        { id: "TRN-001", tech: "Suresh P.", topic: "Anti-Reflective Coating", date: "2023-11-15", status: "Completed" },
    ],
    "payroll": [
        { id: "PAY-001", tech: "Rajesh Kumar", base: 45000, bonus: 5000, total: 50000, month: "Nov 2023" },
    ],
    "staff": [
        { id: "STF-001", name: "Neha Gupta", role: "Receptionist", status: "Present" },
    ],
    "franchise": [
        { id: "FRN-001", location: "Downtown Branch", manager: "Vikas M.", revenue: "12.4L" },
    ],
    "marketing": [
        { id: "CMP-001", name: "Diwali Vision Sale", type: "SMS", reach: 5000, conversion: "4.2%" },
    ],
    "accounting": [
        { id: "ACC-001", type: "Expense", amount: 12000, category: "Utility", date: "2023-11-20" },
    ],
    "automation": [
        { id: "RUL-001", name: "Auto-Remake Ticket", trigger: "QC Fail", action: "Create Ticket" },
    ],
    "integrations": [
        { id: "INT-001", name: "WhatsApp Business", status: "Connected", latency: "12ms" },
    ],
    "mobile-app": [],
    "crm-lifecycle": [
        // Using simple mock for now as schema integration is complex
        { id: "LCY-4001", name: "Amit Sharma", patientId: "PAT-1001", stage: "Active Patient", lastUpdate: "2026-02-10", visitCount: 8, revenue: 24500 },
        { id: "LCY-4002", name: "Priya Singh", patientId: "PAT-1002", stage: "Repeat Customer", lastUpdate: "2026-02-08", visitCount: 15, revenue: 42000 },
    ],
    "crm-followups": [
        {
            id: "TASK-3001",
            type: "Call",
            linkedTo: "LEAD-1001 - Rajesh Verma",
            dueDate: "2026-02-12",
            dueTime: "10:00 AM",
            assignedTo: "Neha Gupta",
            priority: "High",
            status: "Pending",
            notes: "Discuss appointment availability"
        },
        // ... adding simplified loop content
    ],
    "crm-dashboard": [],
    "dashboard": [],
    "crm-leads": [], // Handled by DB.leads
    "patient-management": [], // Handled by DB.patients
    "lab-jobs": [], // Handled by DB.labJobs
    "crm-opportunities": [], // Handled by DB.opportunities
    "crm-campaigns": [] // Handled by DB.campaigns
};
