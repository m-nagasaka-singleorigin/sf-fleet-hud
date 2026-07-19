// Demo-only helpers shared by the console screens. NOT part of the registry.

/**
 * YYYY-MM-DD from a Date's *local* fields.
 *
 * `toISOString().slice(0, 10)` is wrong here: the calendar hands back local
 * midnight, which UTC-shifts to the previous day in any timezone east of
 * Greenwich (picking Jul 15 in JST displayed Jul 14).
 */
export function formatDay(d: Date) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-")
}
