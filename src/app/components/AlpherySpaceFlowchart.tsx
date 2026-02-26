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
  Database,
  ArrowDown,
  Workflow,
  Circle
} from 'lucide-react';
import { FlowchartBox } from './FlowchartBox';

export function AlpherySpaceFlowchart() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 overflow-auto relative">
      {/* Animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Main Title */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-1000">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-in slide-in-from-left duration-1000">
              Alphery Space
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full animate-pulse"></div>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Multi-Tenant Control Plane
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full animate-pulse"></div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white shadow-lg border border-purple-200">
            <Workflow className="w-4 h-4 text-purple-600" />
            <p className="text-sm font-semibold text-gray-700">
              System Architecture & Data Flow
            </p>
          </div>
        </div>

        {/* Flowchart */}
        <div className="flex flex-col items-center gap-8">
          
          {/* LAYER 1: CORE SYSTEM */}
          <div className="relative w-full animate-in fade-in slide-in-from-left duration-1000 delay-200">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm shadow-xl flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  LAYER 1: CORE SYSTEM
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
              <FlowchartBox
                title="Authentication"
                icon={<Key className="w-5 h-5" />}
                items={['Firebase Gmail', 'OAuth 2.0', 'Session Mgmt', 'MFA']}
                color="#3b82f6"
                size="small"
                delay={0}
              />
              <FlowchartBox
                title="Tenant Management"
                icon={<Users className="w-5 h-5" />}
                items={['Multi-Tenant', 'Provisioning', 'Settings', 'Isolation']}
                color="#3b82f6"
                size="small"
                delay={100}
              />
              <FlowchartBox
                title="Role & Permissions"
                icon={<Shield className="w-5 h-5" />}
                items={['RBAC', 'Access Control', 'Custom Roles', 'Policies']}
                color="#3b82f6"
                size="small"
                delay={200}
              />
              <FlowchartBox
                title="Automation Engine"
                icon={<Zap className="w-5 h-5" />}
                items={['Workflows', 'Triggers', 'Scheduling', 'Events']}
                color="#3b82f6"
                size="small"
                delay={300}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-items-center mt-5">
              <FlowchartBox
                title="Notifications"
                icon={<Bell className="w-5 h-5" />}
                items={['Email', 'WhatsApp', 'SMS', 'Push']}
                color="#0ea5e9"
                size="small"
                delay={400}
              />
              <FlowchartBox
                title="Audit Logs"
                icon={<FileText className="w-5 h-5" />}
                items={['Activity Track', 'System Logs', 'Reports', 'History']}
                color="#0ea5e9"
                size="small"
                delay={500}
              />
              <FlowchartBox
                title="API Gateway"
                icon={<Globe className="w-5 h-5" />}
                items={['REST APIs', 'GraphQL', 'Webhooks', 'Rate Limit']}
                color="#0ea5e9"
                size="small"
                delay={600}
              />
              <FlowchartBox
                title="App Marketplace"
                icon={<LayoutGrid className="w-5 h-5" />}
                items={['Enable/Disable', 'Plugins', 'Configs', 'Versions']}
                color="#0ea5e9"
                size="small"
                delay={700}
              />
            </div>
          </div>

          {/* Animated Arrow Connector */}
          <div className="flex flex-col items-center gap-1 my-4 animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3 text-blue-500 fill-blue-500 animate-pulse" />
              <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 via-purple-500 to-purple-600 animate-pulse"></div>
              <Circle className="w-3 h-3 text-purple-500 fill-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <ArrowDown className="w-10 h-10 text-purple-600 animate-bounce drop-shadow-lg" />
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3 text-purple-600 fill-purple-600 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="w-0.5 h-8 bg-gradient-to-b from-purple-600 to-pink-500 animate-pulse"></div>
              <Circle className="w-3 h-3 text-pink-500 fill-pink-500 animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* LAYER 2: TENANT WORKSPACE */}
          <div className="relative w-full animate-in fade-in slide-in-from-right duration-1000 delay-400">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm shadow-xl flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  LAYER 2: TENANT WORKSPACE
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 justify-items-center max-w-5xl mx-auto">
              <FlowchartBox
                title="Tenant Profile"
                icon={<UserCircle className="w-5 h-5" />}
                items={['Company Info', 'Contact', 'Timezone', 'Industry']}
                color="#a855f7"
                size="small"
                delay={0}
              />
              <FlowchartBox
                title="Subscription"
                icon={<CreditCard className="w-5 h-5" />}
                items={['Plans', 'Billing', 'Limits', 'Features']}
                color="#a855f7"
                size="small"
                delay={100}
              />
              <FlowchartBox
                title="Branding"
                icon={<Palette className="w-5 h-5" />}
                items={['Logo', 'Theme', 'Domain', 'Templates']}
                color="#c026d3"
                size="small"
                delay={200}
              />
              <FlowchartBox
                title="Branch Config"
                icon={<GitBranch className="w-5 h-5" />}
                items={['Setup', 'Locations', 'Hierarchy', 'Access']}
                color="#c026d3"
                size="small"
                delay={300}
              />
              <FlowchartBox
                title="Enabled Apps"
                icon={<Grid className="w-5 h-5" />}
                items={['Active Apps', 'Permissions', 'Modules', 'Settings']}
                color="#c026d3"
                size="small"
                delay={400}
              />
            </div>
          </div>

          {/* Animated Arrow Connector */}
          <div className="flex flex-col items-center gap-1 my-4 animate-in fade-in zoom-in duration-1000 delay-700">
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3 text-pink-500 fill-pink-500 animate-pulse" />
              <div className="w-0.5 h-8 bg-gradient-to-b from-pink-500 via-rose-500 to-green-500 animate-pulse"></div>
              <Circle className="w-3 h-3 text-green-500 fill-green-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <ArrowDown className="w-10 h-10 text-green-600 animate-bounce drop-shadow-lg" />
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3 text-green-600 fill-green-600 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="w-0.5 h-8 bg-gradient-to-b from-green-600 to-emerald-500 animate-pulse"></div>
              <Circle className="w-3 h-3 text-emerald-500 fill-emerald-500 animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* LAYER 3: BUSINESS APPS */}
          <div className="relative w-full animate-in fade-in slide-in-from-bottom duration-1000 delay-600">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative px-8 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm shadow-xl flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5" />
                  LAYER 3: BUSINESS APPS
                </div>
              </div>
            </div>
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-6">
              <FlowchartBox
                title="A. CRM App"
                icon={<Target className="w-5 h-5" />}
                items={[
                  'Leads & Enquiries',
                  'Pipeline',
                  'Follow-ups',
                  'Campaigns',
                  'Analytics'
                ]}
                color="#ef4444"
                size="medium"
                delay={0}
              />
              <FlowchartBox
                title="B. Hospital Mgmt"
                icon={<Stethoscope className="w-5 h-5" />}
                items={[
                  'Patients',
                  'Appointments',
                  'OPD',
                  'Prescriptions',
                  'Billing'
                ]}
                color="#ec4899"
                size="medium"
                delay={100}
              />
              <FlowchartBox
                title="C. Optical Lab"
                icon={<FlaskConical className="w-5 h-5" />}
                items={[
                  'Lab Jobs',
                  'QC Checklist',
                  'Machines',
                  'Inventory',
                  'Vendors'
                ]}
                color="#f97316"
                size="medium"
                delay={200}
              />
              <FlowchartBox
                title="D. Inventory & SCM"
                icon={<Warehouse className="w-5 h-5" />}
                items={[
                  'Product Catalog',
                  'SKU Mgmt',
                  'Stock',
                  'Purchase Orders',
                  'Transfers'
                ]}
                color="#eab308"
                size="medium"
                delay={300}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              <FlowchartBox
                title="E. HR & Payroll"
                icon={<Users2 className="w-5 h-5" />}
                items={[
                  'Employees',
                  'Attendance',
                  'Leave Mgmt',
                  'Payroll',
                  'Performance'
                ]}
                color="#84cc16"
                size="medium"
                delay={400}
              />
              <FlowchartBox
                title="F. Finance & Accounting"
                icon={<DollarSign className="w-5 h-5" />}
                items={[
                  'Accounts',
                  'Journal',
                  'AR/AP',
                  'GST/Tax',
                  'Reports'
                ]}
                color="#06b6d4"
                size="medium"
                delay={500}
              />
              <FlowchartBox
                title="G. Franchise Mgmt"
                icon={<Store className="w-5 h-5" />}
                items={[
                  'Branch Setup',
                  'Agreements',
                  'Royalty',
                  'KPIs',
                  'Performance'
                ]}
                color="#6366f1"
                size="medium"
                delay={600}
              />
              <FlowchartBox
                title="H. Ecommerce"
                icon={<ShoppingBag className="w-5 h-5" />}
                items={[
                  'Product Listing',
                  'Cart & Orders',
                  'Payments',
                  'Delivery',
                  'Loyalty'
                ]}
                color="#a855f7"
                size="medium"
                delay={700}
              />
            </div>
          </div>

          {/* Animated Arrow Connector */}
          <div className="flex flex-col items-center gap-1 my-4 animate-in fade-in zoom-in duration-1000 delay-900">
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3 text-emerald-500 fill-emerald-500 animate-pulse" />
              <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500 via-cyan-500 to-blue-600 animate-pulse"></div>
              <Circle className="w-3 h-3 text-blue-600 fill-blue-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <ArrowDown className="w-10 h-10 text-blue-600 animate-bounce drop-shadow-lg" />
          </div>

          {/* DATA LAYER */}
          <div className="relative animate-in fade-in slide-in-from-bottom duration-1000 delay-1000">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  DATA & INFRASTRUCTURE LAYER
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative px-10 py-6 rounded-2xl bg-white shadow-xl border-2 border-blue-500 hover:scale-105 transform transition-all duration-500">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                      <Database className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-800">Multi-Tenant Database</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2 ml-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Data Isolation & Security</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                      <span>Scalable Architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <span>Backup & Recovery</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative px-10 py-6 rounded-2xl bg-white shadow-xl border-2 border-indigo-500 hover:scale-105 transform transition-all duration-500">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-800">Cloud Infrastructure</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2 ml-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <span>Auto-scaling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>Load Balancing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                      <span>High Availability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom duration-1000 delay-1200">
          <div className="inline-flex items-center gap-4 px-10 py-4 rounded-2xl bg-white shadow-2xl border border-gray-200 hover:scale-105 transform transition-all duration-500">
            <div className="flex gap-2.5">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse shadow-lg"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse shadow-lg" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse shadow-lg" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Enterprise-Grade • Scalable • Modular • Multi-Tenant • Cloud-Native
            </span>
          </div>
          
          <p className="mt-4 text-gray-500 text-sm font-medium">
            Built for the future of enterprise applications
          </p>
        </div>
      </div>
    </div>
  );
}
