/**
 * Kirti Eye Care - Enterprise ERP Schema
 * Version: 1.0.0
 * 
 * This file defines the core data models for the Enterprise ERP system,
 * including strict typing for Hospital, Lab, CRM, and Finance modules.
 * It serves as the single source of truth for the application's data structure.
 */

// --- GLOBAL UTILITIES ---
export type UUID = string;
export type ISODate = string;
export type UserID = string;
export type BranchID = string;
export type Money = number; // Standardized currency handling

// --- ENUMS & CONSTANTS ---
export const ROLES = {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    OPTOMETRIST: 'optometrist',
    LAB_TECHNICIAN: 'lab_tech',
    FRONT_DESK: 'front_desk',
    SALES_EXECUTIVE: 'sales_executive',
    BRANCH_MANAGER: 'branch_manager'
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

// --- 1. UNIVERSAL RECORD ENGINE (CORE) ---
// Every entity in the system extends this base interface for consistency
export interface BaseRecord {
    id: UUID;
    createdAt: ISODate;
    updatedAt: ISODate;
    createdBy: UserID;
    updatedBy: UserID;
    isActive: boolean;

    // Ownership & Security
    ownerId: UserID;       // Primary owner (e.g., Sales Exec for Lead)
    branchId: BranchID;    // Multi-branch data isolation

    // Tagging & Metadata for Flexibility
    tags: string[];
    metadata?: Record<string, any>;
}

export interface User extends BaseRecord {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    avatarUrl?: string;
    permissions: string[];
    lastLogin?: ISODate;
}

// --- 2. AUDIT & TIMELINE ENGINE ---
export type ActivityType =
    | 'status_change'
    | 'comment'
    | 'call_log'
    | 'whatsapp_sent'
    | 'email_sent'
    | 'task_created'
    | 'appointment'
    | 'system_alert';

export interface ActivityLog extends BaseRecord {
    entityId: UUID;        // ID of the Lead, Patient, Job, etc.
    entityType: string;    // 'lead', 'patient', 'lab_job'
    type: ActivityType;
    title: string;
    description: string;

    // For automated actions vs manual user actions
    actorId: UserID | 'system';

    // Metadata for deep linking or rich rendering
    meta?: {
        prevStatus?: string;
        newStatus?: string;
        duration?: number; // Call duration in seconds
        cost?: Money;      // Campaign action cost
    };
}

// --- 3. PILLAR 1: HOSPITAL MANAGEMENT ---
export type PatientLifecycleStage = 'Prospect' | 'New' | 'Active' | 'VIP' | 'Dormant' | 'Churned';

export interface Patient extends BaseRecord {
    mrn: string; // Medical Record Number (Human readable ID)
    fullName: string;
    phone: string;
    email?: string;
    gender: 'Male' | 'Female' | 'Other';
    dob?: ISODate;
    address?: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };

    // Medical & CRM Context
    lifecycleStage: PatientLifecycleStage;
    lastVisitDate?: ISODate;
    totalVisits: number;
    totalRevenue: Money;

    // Family Linking
    primaryFamilyMemberId?: UUID;
}

export type AppointmentStatus = 'Scheduled' | 'Confirmed' | 'Checked-In' | 'In-Consultation' | 'Completed' | 'Cancelled' | 'No-Show';

export interface Appointment extends BaseRecord {
    patientId: UUID;
    doctorId: UserID;
    type: 'Consultation' | 'Follow-up' | 'Procedure' | 'Eye-Test';
    status: AppointmentStatus;

    scheduledTime: ISODate;
    durationMinutes: number;

    notes?: string;
    tokenNumber?: string; // Daily token
}

// --- 4. PILLAR 2: OPTICAL LAB CRM ---
export type JobStatus =
    | 'New'
    | 'Frame_Selected'
    | 'In_Lab'
    | 'Surfacing'
    | 'Coating'
    | 'Fitting'
    | 'QC_Pending'
    | 'QC_Failed'
    | 'Ready'
    | 'Delivered';

export type LensType = 'SingleVision' | 'Bifocal' | 'Progressive';
export type LensMaterial = 'CR39' | 'Polycarbonate' | 'HighIndex' | 'Trivex';

export interface LabJob extends BaseRecord {
    jobId: string; // Printable ID like JOB-2024-001
    patientId: UUID;
    orderId: UUID; // Link to Billing

    technicianId?: UserID; // Assigned Technician
    machineId?: UUID;      // Machine used for edging/surfacing

    status: JobStatus;
    priority: 'Normal' | 'High' | 'Urgent';

    // Lens Specification (OD - Right, OS - Left)
    prescription: {
        od: { sph: number; cyl: number; axis: number; add: number };
        os: { sph: number; cyl: number; axis: number; add: number };
        pd: number;
    };

    lensDetails: {
        type: LensType;
        material: LensMaterial;
        coating: string[]; // ['Anti-Glare', 'Blue-Cut']
        brand: string;
    };

    // QC & Timeline
    qcChecklistId?: UUID;
    targetDeliveryDate: ISODate;
    actualDeliveryDate?: ISODate;
    redoCount: number; // Track remakes
}

export interface QCChecklist extends BaseRecord {
    jobId: UUID;
    technicianId: UserID;
    checks: {
        powerAccuracy: boolean;
        axisAlignment: boolean;
        surfaceQuality: boolean; // No scratches
        fittingTightness: boolean;
        cleaning: boolean;
    };
    passed: boolean;
    failureReason?: string;
}

// --- 5. PILLAR 3: CRM & MARKETING ---
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Appointment_Booked' | 'Converted' | 'Lost';
export type LeadSource = 'Website' | 'Walk-in' | 'Referral' | 'Campaign' | 'Social_Media';

export interface Lead extends BaseRecord {
    fullName: string;
    phone: string;
    email?: string;
    source: LeadSource;

    status: LeadStatus;
    leadScore: number; // 0-100 logic

    // Pipeline Data
    interest: 'Surgery' | 'Spectacles' | 'Consultation' | 'Eye-Test';
    budget?: string;

    // Automation Logic
    lastContactedDate?: ISODate;
    nextFollowUpDate?: ISODate;
}

export type OpportunityStage = 'New' | 'Appointment' | 'Consultation' | 'Quotation' | 'Negotiation' | 'Won' | 'Lost';

export interface Opportunity extends BaseRecord {
    leadId: UUID; // Could be a patient too if existing
    patientId?: UUID;
    name: string; // Deal Name

    stage: OpportunityStage;
    amount: Money;
    expectedCloseDate: ISODate;
    probability: number; // 0-100%

    // Lost Analysis
    lostReason?: string;
}

export interface Campaign extends BaseRecord {
    name: string;
    type: 'SMS' | 'Email' | 'WhatsApp' | 'Social' | 'Offline';
    status: 'Draft' | 'Active' | 'Completed' | 'Paused';

    startDate: ISODate;
    endDate: ISODate;

    // Metrics
    budget: Money;
    spent: Money;
    leadsGenerated: number;
    conversionCount: number;
    roi: number; // Calculated field
}

// --- 6. PILLAR 5: FINANCE ---
export type InvoiceStatus = 'Draft' | 'Sent' | 'Partially_Paid' | 'Paid' | 'Overdue' | 'Void';

export interface Invoice extends BaseRecord {
    invoiceNumber: string; // INV-2024-001
    patientId: UUID;

    lineItems: Array<{
        description: string;
        quantity: number;
        unitPrice: Money;
        total: Money;
        taxRate: number;
    }>;

    subtotal: Money;
    taxTotal: Money;
    discountTotal: Money;
    grandTotal: Money;

    amountPaid: Money;
    balanceDue: Money;

    status: InvoiceStatus;
    dueDate: ISODate;
}
