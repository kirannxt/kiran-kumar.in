"use client";

import MigrationPage from "@/components/MigrationPage";
import { useRouter } from "next/navigation";

export default function DedicatedMigrationPage() {
  const router = useRouter();

  const handleToggle = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("site_preview_mode", "portfolio");
    }
    router.push("/?migration=0");
  };

  return <MigrationPage onToggleMode={handleToggle} isMigration={true} />;
}
