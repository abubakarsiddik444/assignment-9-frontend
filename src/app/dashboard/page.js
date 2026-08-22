import { redirect } from "next/navigation";

// Dashboard has no index page — send users to their listings by default.
export default function DashboardIndexPage() {
  redirect("/dashboard/my-listings");
}
