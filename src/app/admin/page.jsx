// src/app/admin/page.jsx that automatically redirects the user to the login page. This is a common and user-friendly pattern.
// Now, when anyone visits /admin, Next.js will automatically send them to /admin/login.

import { redirect } from "next/navigation";

export default function AdminRootPage() {
   // This component will never actually render.
   // The server will handle the redirect immediately.
   redirect("/admin/login");
}
