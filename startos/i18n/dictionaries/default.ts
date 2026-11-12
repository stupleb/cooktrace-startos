export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting CookTrace!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The CookTrace web app and API. The Android and Wear OS apps and other Trace apps connect here too.': 5,

  // actions/setAdminPassword.ts
  'Set Admin Password': 6,
  'Create the CookTrace admin account, or give it a new random password.': 7,
  'Replaces the current admin password. Devices already signed in stay signed in.': 8,
  'CookTrace Admin': 9,
  'Sign in to CookTrace with these credentials.': 10,
  Username: 11,
  Password: 12,

  // init/watchAdminPassword.ts
  'Create the CookTrace admin account so you can sign in for the first time.': 13,

  // actions/setPrimaryUrl.ts
  'Set Primary URL': 14,
  'Choose the address CookTrace puts in its links: invitations, password resets, shared recipes and weekly summaries. A running CookTrace restarts to apply it.': 15,
  'Primary URL': 16,
  'Pick an address everyone who gets a link can reach. Until you pick one, CookTrace uses a public domain if this interface has one, otherwise its .local address.': 17,

  // actions/manageSmtp.ts
  'Configure SMTP': 18,
  "Let CookTrace send email: password resets, invitations, shared-recipe notices and weekly summaries. CookTrace's Settings > Email (SMTP) shows it read-only. CookTrace restarts to apply it.": 19,

  // actions/setApiAccess.ts
  Access: 20,
  'What a client can do with an API token that holds the matching mcp:read, mcp:write or mcp:destroy scope. Delete applies to MCP only; the REST API has no delete routes.': 21,
  Off: 22,
  Read: 23,
  'Read and write': 24,
  'Read, write and delete': 25,
  'Configure API Access': 26,
  'Turn on the MCP endpoint (/api/mcp) for AI assistants and the personal REST API (/api/v1) for your own scripts. Each client also needs an API token an admin creates in Settings > API Tokens. CookTrace restarts to apply it.': 27,

  // main.ts
  'Generated secrets are missing from store.json': 28,

  // actions/setRegionalDefaults.ts
  'Use for new accounts': 29,
  "When on, every account created from now on starts with these settings. Turn off to give new accounts CookTrace's own defaults again. Existing accounts are never changed.": 30,
  Language: 31,
  'The language CookTrace opens in.': 32,
  'Measurement system': 33,
  'Which units CookTrace lists first when you pick an ingredient unit, and which units Trace AI uses.': 34,
  'Metric (g, ml, °C)': 35,
  'Imperial (oz, cup, lb, °F)': 36,
  Energy: 37,
  'Calories (kcal)': 38,
  'Kilojoules (kJ)': 39,
  'Date format': 40,
  'Time format': 41,
  '24-hour': 42,
  '12-hour': 43,
  'Food search country': 44,
  'Open Food Facts searches show only products sold in this country.': 45,
  Anywhere: 46,
  'Food search language': 47,
  'Open Food Facts searches show products in this language, with their names in it where available.': 48,
  'Set Regional Defaults': 49,
  'Choose the language, measurement system, date and time formats and food search region that new CookTrace accounts start with. An account gets them the moment it is created; existing accounts keep their settings.': 50,
  'Regional Defaults Turned Off': 51,
  "New accounts start with CookTrace's own defaults again. Existing accounts keep their settings.": 52,
  'Regional Defaults Saved': 53,
  'New accounts start with these settings from now on. Existing accounts keep theirs.': 54,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
