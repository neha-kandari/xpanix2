"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-[#764ba2] dark:hover:text-[#667eea] transition-colors"
    >
      Log out
    </button>
  );
}
