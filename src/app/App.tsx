import { createBrowserRouter, RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Workspace from './pages/Workspace';
import CRM from './pages/CRM';
import Hospital from './pages/Hospital';
import RoleUtility from './pages/RoleUtility';
import Lab from './pages/Lab';
import Inventory from './pages/Inventory';
import HR from './pages/HR';
import AccountingPage from './pages/Accounting';
import SalesPage from './pages/Sales';
import FranchisePage from './pages/Franchise';
import EcommercePage from './pages/Ecommerce';
import Projects from './pages/Projects';
import Communication from './pages/Communication';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/workspace",
    element: <Workspace />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/crm",
    element: <CRM />,
  },
  {
    path: "/hospital",
    element: <Hospital />,
  },
  {
    path: "/role-utility",
    element: <RoleUtility />,
  },
  {
    path: "/lab",
    element: <Lab />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/accounting",
    element: <AccountingPage />,
  },
  {
    path: "/sales",
    element: <SalesPage />,
  },
  {
    path: "/hr",
    element: <HR />,
  },
  {
    path: "/franchise",
    element: <FranchisePage />,
  },
  {
    path: "/ecommerce",
    element: <EcommercePage />,
  },
  {
    path: "/communication",
    element: <Communication />,
  }
]);

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </>
  );
}