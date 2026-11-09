import { sdk } from './sdk'

export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('main', 'startos').setOptions({
    // CookTrace's own backup archives, and its one-hour cache of recipe archives being imported.
    exclude: ['/backups/', '/uploads/.import-cache/'],
  }),
)
