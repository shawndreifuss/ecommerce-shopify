// /components/logout-button.tsx (Server Component)
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function LogoutButton() {
  // This is the server-side logout function
  const handleLogout = async () => {
    await signOut();
    redirect("/"); // Optionally redirect to home page after logout
  };

  return (
    <form action={handleLogout}>
      <button type="submit" className="text-red-600">
        Logout
      </button>
    </form>
  );
}
