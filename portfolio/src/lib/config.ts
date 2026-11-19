/**
 * Site Configuration & Mode Toggles
 *
 * - underMigration: Set to `true` to display the "Website Under Migration" page by default.
 *                   Set to `false` to display the full interactive portfolio.
 *
 * Runtime overrides supported:
 * - URL Parameter: `?migration=true` or `?migration=false` (or `?migration=1` / `?migration=0`)
 * - In-browser toggle: Click the floating mode switch pill on the page.
 */
export const SITE_CONFIG = {
  // Set to true to activate Migration Mode by default; set to false when live.
  underMigration: true,

  // Default simulated progress for the migration bar (0 - 100)
  defaultProgress: 88,

  // Estimated cutover label displayed in footer & telemetry
  estimatedCutoverTime: "~35 Mins",
};
