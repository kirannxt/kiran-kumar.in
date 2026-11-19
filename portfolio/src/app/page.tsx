import App from "@/components/App";
import MigrationPage from "@/components/MigrationPage";
import { SITE_CONFIG } from "@/lib/config";

export default function Page() {
  if (SITE_CONFIG.underMigration) {
    return <MigrationPage />;
  }

  return <App />;
}
