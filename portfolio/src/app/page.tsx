"use client";

import { useState, useEffect } from "react";
import App from "@/components/App";
import MigrationPage from "@/components/MigrationPage";
import { SITE_CONFIG } from "@/lib/config";

export default function Page() {
  const [isMigration, setIsMigration] = useState(SITE_CONFIG.underMigration);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      // 1. Query param override: ?migration=1 / ?migration=0 or ?migration=true / false
      if (params.has("migration")) {
        const val = params.get("migration");
        setIsMigration(val === "true" || val === "1");
        return;
      }

      // 2. Query param alias: ?preview=portfolio or ?preview=migration
      if (params.has("preview")) {
        const val = params.get("preview");
        setIsMigration(val === "migration");
        return;
      }

      // 3. LocalStorage persistence for testing/previewing
      const saved = localStorage.getItem("site_preview_mode");
      if (saved) {
        setIsMigration(saved === "migration");
      }
    }
  }, []);

  const handleToggle = () => {
    const next = !isMigration;
    setIsMigration(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("site_preview_mode", next ? "migration" : "portfolio");
    }
  };

  // SSR / initial static export reflects SITE_CONFIG.underMigration
  if (!mounted) {
    return SITE_CONFIG.underMigration ? (
      <MigrationPage onToggleMode={handleToggle} isMigration={true} />
    ) : (
      <App onToggleMigration={handleToggle} isMigration={false} />
    );
  }

  return isMigration ? (
    <MigrationPage onToggleMode={handleToggle} isMigration={true} />
  ) : (
    <App onToggleMigration={handleToggle} isMigration={false} />
  );
}
