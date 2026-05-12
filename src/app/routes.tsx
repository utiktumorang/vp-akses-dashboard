import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Login from "./pages/Login";
import GrowthDashboard from "./pages/GrowthDashboard";
import RetentionDashboard from "./pages/RetentionDashboard";
import ServiceQualityDashboard from "./pages/ServiceQualityDashboard";
import RevenueDetail from "./pages/RevenueDetail";
import ChurnRateDetail from "./pages/ChurnRateDetail";
import TargetRevenue from "./pages/TargetRevenue";
import { DashboardLayout } from "./components/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

const DashboardWrapper = () => (
  <ProtectedRoute>
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  </ProtectedRoute>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: <Navigate to="/dashboard/growth" replace />,
  },
  {
    path: "/dashboard",
    element: <DashboardWrapper />,
    children: [
      {
        path: "growth",
        Component: GrowthDashboard,
      },
      {
        path: "retention",
        Component: RetentionDashboard,
      },
      {
        path: "service-quality",
        Component: ServiceQualityDashboard,
      },
    ],
  },
  {
    path: "/revenue",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <RevenueDetail />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/churn-rate",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <ChurnRateDetail />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
 {
  path: '/target-revenue',
  element: (
    <ProtectedRoute>
      <DashboardLayout>
        <TargetRevenue />
      </DashboardLayout>
    </ProtectedRoute>
  ),
},
]);
