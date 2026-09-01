export const instant = false //TODO: Handle this properly
import { redirect } from "next/navigation";
import { AdminClient } from "./admin-client";

import { getIsAdmin } from "@/lib/admin";

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();
  
  if (!isAdmin) {
    redirect("/");
  }
  return (
    <>
      <AdminClient />
    </>
  );
};

export default AdminPage;
