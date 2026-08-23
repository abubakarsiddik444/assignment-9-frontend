"use client";

import PrivateRoute from "@/routes/PrivateRoute";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <DashboardSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </PrivateRoute>
  );
}
