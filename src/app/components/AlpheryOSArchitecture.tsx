import {
  Shield,
  Users,
  Key,
  Zap,
  Bell,
  FileText,
  Globe,
  Grid,
  Building2,
  CreditCard,
  Palette,
  GitBranch,
  LayoutGrid,
  UserCircle,
  Target,
  Stethoscope,
  FlaskConical,
  Warehouse,
  Users2,
  DollarSign,
  Store,
  ShoppingBag,
  Sparkles,
  Layers,
  Boxes
} from 'lucide-react';
import { ArchitectureNode } from './ArchitectureNode';

export function AlpheryOSArchitecture() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8 overflow-auto">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6 perspective-1000">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Alphery Space
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>
            <p className="text-2xl font-semibold text-blue-200">
              Multi-Tenant Control Plane
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full"></div>
          </div>
          
          <p className="text-sm text-purple-300 backdrop-blur-sm bg-white/5 inline-block px-6 py-2 rounded-full border border-white/10">
            ✨ Click any section to expand and explore the architecture
          </p>
        </div>

        {/* Architecture Layers */}
        <div className="space-y-8">
          {/* Core System Layer */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <ArchitectureNode
                title="1. Core System Layer"
                icon={<Layers className="w-7 h-7" />}
                color="#3b82f6"
                defaultExpanded={false}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ArchitectureNode
                    title="Authentication"
                    icon={<Key className="w-5 h-5" />}
                    color="#3b82f6"
                    items={['Firebase Gmail Login', 'OAuth Integration', 'Session Management', 'Multi-Factor Auth']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="Tenant Management"
                    icon={<Users className="w-5 h-5" />}
                    color="#3b82f6"
                    items={['Multi-Tenant Isolation', 'Tenant Provisioning', 'Tenant Settings', 'Data Segregation']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="Role & Permission Engine"
                    icon={<Shield className="w-5 h-5" />}
                    color="#3b82f6"
                    items={['RBAC System', 'Permission Groups', 'Access Control Lists', 'Custom Roles']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="Automation Engine"
                    icon={<Zap className="w-5 h-5" />}
                    color="#3b82f6"
                    items={['Workflow Builder', 'Triggers & Actions', 'Scheduled Tasks', 'Event Processing']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="Notification Engine"
                    icon={<Bell className="w-5 h-5" />}
                    color="#3b82f6"
                    items={['Email Notifications', 'WhatsApp Integration', 'SMS Gateway', 'Push Notifications']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="Activity & Audit Logs"
                    icon={<FileText className="w-5 h-5" />}
                    color="#3b82f6"
                    items={['User Activity Tracking', 'System Logs', 'Compliance Reports', 'Change History']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="API Gateway"
                    icon={<Globe className="w-5 h-5" />}
                    color="#3b82f6"
                    items={['REST APIs', 'GraphQL Support', 'API Rate Limiting', 'Webhook Management']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="App Marketplace"
                    icon={<LayoutGrid className="w-5 h-5" />}
                    color="#3b82f6"
                    items={['App Enable/Disable', 'App Configurations', 'Plugin System', 'Version Control']}
                    expandable={true}
                  />
                </div>
              </ArchitectureNode>
            </div>
          </div>

          {/* Tenant Workspace */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <ArchitectureNode
                title="2. Tenant Workspace"
                icon={<Building2 className="w-7 h-7" />}
                color="#a855f7"
                defaultExpanded={false}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ArchitectureNode
                    title="Tenant Profile"
                    icon={<UserCircle className="w-5 h-5" />}
                    color="#a855f7"
                    items={['Company Info', 'Contact Details', 'Timezone Settings', 'Industry Type']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="Subscription Plan"
                    icon={<CreditCard className="w-5 h-5" />}
                    color="#a855f7"
                    items={['Plan Management', 'Billing Cycle', 'Usage Limits', 'Feature Access']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="Branding Settings"
                    icon={<Palette className="w-5 h-5" />}
                    color="#a855f7"
                    items={['Logo Upload', 'Color Theme', 'Custom Domain', 'Email Templates']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="Branch Configuration"
                    icon={<GitBranch className="w-5 h-5" />}
                    color="#a855f7"
                    items={['Branch Setup', 'Location Management', 'Hierarchy', 'Multi-Branch Access']}
                    expandable={true}
                  />
                  <ArchitectureNode
                    title="Enabled Apps"
                    icon={<Grid className="w-5 h-5" />}
                    color="#a855f7"
                    items={['Active Apps', 'App Permissions', 'Module Access', 'Integration Settings']}
                    expandable={true}
                  />
                </div>
              </ArchitectureNode>
            </div>
          </div>

          {/* Business Apps Layer */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <ArchitectureNode
                title="3. Business Apps Layer"
                icon={<Boxes className="w-7 h-7" />}
                color="#10b981"
                defaultExpanded={false}
              >
                <div className="space-y-5">
                  {/* CRM App */}
                  <div className="relative group/app">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl blur opacity-20 group-hover/app:opacity-30 transition"></div>
                    <div className="relative">
                      <ArchitectureNode
                        title="A. CRM App (Sales & Relationship)"
                        icon={<Target className="w-6 h-6" />}
                        color="#ef4444"
                        items={[
                          'Leads / Enquiries',
                          'Opportunities Pipeline',
                          'Follow-ups & Tasks',
                          'Customer Lifecycle',
                          'Campaign Management',
                          'Referral Tracking',
                          'CRM Analytics Dashboard',
                          'Sales Forecasting'
                        ]}
                      />
                    </div>
                  </div>

                  {/* Hospital Management App */}
                  <div className="relative group/app">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl blur opacity-20 group-hover/app:opacity-30 transition"></div>
                    <div className="relative">
                      <ArchitectureNode
                        title="B. Hospital Management App"
                        icon={<Stethoscope className="w-6 h-6" />}
                        color="#ec4899"
                        items={[
                          'Patients',
                          'Appointments',
                          'OPD / Consultation',
                          'Prescriptions',
                          'Billing & Payments',
                          'Pharmacy',
                          'Insurance / TPA',
                          'Medical Records'
                        ]}
                      />
                    </div>
                  </div>

                  {/* Optical Lab App */}
                  <div className="relative group/app">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur opacity-20 group-hover/app:opacity-30 transition"></div>
                    <div className="relative">
                      <ArchitectureNode
                        title="C. Optical Lab App"
                        icon={<FlaskConical className="w-6 h-6" />}
                        color="#f97316"
                        items={[
                          'Lab Jobs',
                          'QC Checklist',
                          'Remake Tickets',
                          'Technicians',
                          'Machines',
                          'Machine Calibration Logs',
                          'Consumables Inventory',
                          'Vendors / Suppliers',
                          'Training Records',
                          'Salary & Bonus'
                        ]}
                      />
                    </div>
                  </div>

                  {/* Inventory & Supply Chain App */}
                  <div className="relative group/app">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl blur opacity-20 group-hover/app:opacity-30 transition"></div>
                    <div className="relative">
                      <ArchitectureNode
                        title="D. Inventory & Supply Chain App"
                        icon={<Warehouse className="w-6 h-6" />}
                        color="#eab308"
                        items={[
                          'Product Catalog (Frames / Lenses)',
                          'SKU Management',
                          'Stock Locations',
                          'Purchase Orders',
                          'GRN',
                          'Stock Transfers',
                          'Reorder Rules',
                          'Warehouse Dashboard',
                          'Stock Analytics'
                        ]}
                      />
                    </div>
                  </div>

                  {/* HR & Payroll App */}
                  <div className="relative group/app">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl blur opacity-20 group-hover/app:opacity-30 transition"></div>
                    <div className="relative">
                      <ArchitectureNode
                        title="E. HR & Payroll App"
                        icon={<Users2 className="w-6 h-6" />}
                        color="#84cc16"
                        items={[
                          'Employees',
                          'Attendance',
                          'Leave Management',
                          'Payroll',
                          'Incentives',
                          'Performance Metrics',
                          'Appraisals',
                          'Training & Development'
                        ]}
                      />
                    </div>
                  </div>

                  {/* Finance & Accounting App */}
                  <div className="relative group/app">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-20 group-hover/app:opacity-30 transition"></div>
                    <div className="relative">
                      <ArchitectureNode
                        title="F. Finance & Accounting App"
                        icon={<DollarSign className="w-6 h-6" />}
                        color="#06b6d4"
                        items={[
                          'Chart of Accounts',
                          'Journal Entries',
                          'AR / AP',
                          'Expense Tracking',
                          'GST / Tax',
                          'Profit & Loss',
                          'Financial Reports',
                          'Budget Planning'
                        ]}
                      />
                    </div>
                  </div>

                  {/* Franchise / Branch Management App */}
                  <div className="relative group/app">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-20 group-hover/app:opacity-30 transition"></div>
                    <div className="relative">
                      <ArchitectureNode
                        title="G. Franchise / Branch Management App"
                        icon={<Store className="w-6 h-6" />}
                        color="#6366f1"
                        items={[
                          'Branch Setup',
                          'Franchise Agreements',
                          'Royalty Calculation',
                          'Branch KPIs',
                          'Performance Comparison',
                          'Compliance Tracking'
                        ]}
                      />
                    </div>
                  </div>

                  {/* Ecommerce App */}
                  <div className="relative group/app">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover/app:opacity-30 transition"></div>
                    <div className="relative">
                      <ArchitectureNode
                        title="H. Ecommerce App (Web + Mobile)"
                        icon={<ShoppingBag className="w-6 h-6" />}
                        color="#a855f7"
                        items={[
                          'Product Listing',
                          'Prescription Upload',
                          'Cart',
                          'Orders',
                          'Payments',
                          'Delivery Tracking',
                          'Returns',
                          'Loyalty Points',
                          'Product Reviews'
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </ArchitectureNode>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 mb-8 text-center">
          <div className="relative inline-flex items-center gap-4 px-8 py-4 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl"></div>
            <div className="relative flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-lg shadow-blue-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse delay-100 shadow-lg shadow-purple-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse delay-200 shadow-lg shadow-pink-500/50"></div>
              </div>
              <span className="text-base font-bold text-white drop-shadow-lg">
                Scalable • Modular • Multi-Tenant • Cloud-Native
              </span>
            </div>
          </div>
          
          <p className="mt-6 text-purple-300/60 text-sm">
            Powered by cutting-edge technology stack
          </p>
        </div>
      </div>
    </div>
  );
}
