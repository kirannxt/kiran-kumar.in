/**
 * Site Configuration
 *
 * Set `underMigration: true` to display the "Website Under Migration" page.
 * Set `underMigration: false` to display the full portfolio.
 */
export const SITE_CONFIG = {
  // Toggle this flag when you want to switch between the Migration page and Live Portfolio
  underMigration: true,

  // Default simulated progress for the migration bar (0 - 100)
  defaultProgress: 88,

  // Estimated cutover label displayed in footer & telemetry
  estimatedCutoverTime: "~35 Mins",
};
