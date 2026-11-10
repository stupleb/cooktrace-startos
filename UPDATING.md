# Updating the upstream version

Upstream is the CookTrace image `ghcr.io/traceapps/cooktrace`, pinned in `startos/manifest/index.ts` (`images.cooktrace.source.dockerTag`). Upstream publishes only two image tags, `latest` (built from `main`, which carries the stable releases) and `dev`, so the pin is `latest` plus the digest of the build that matches the release.

## Determining the upstream version

The latest stable release is the newest GitHub release that is not a pre-release; the `vX.Y.Z-devNN` tags are pre-releases and are never packaged.

```bash
gh release list -R TraceApps/cooktrace --exclude-pre-releases --limit 1
```

## Applying the bump

1. Read the current `latest` index digest and the commit it was built from:

   ```bash
   docker buildx imagetools inspect ghcr.io/traceapps/cooktrace:latest --format '{{.Manifest.Digest}}'
   docker buildx imagetools inspect ghcr.io/traceapps/cooktrace:latest --format '{{json .Image}}' \
     | jq -r '.["linux/amd64"].config.Labels["org.opencontainers.image.revision"]'
   ```

2. Confirm that commit is the release. It must be the release tag's commit, or a later `main` commit whose diff from the tag touches no runtime code:

   ```bash
   gh api repos/TraceApps/cooktrace/compare/vX.Y.Z...<revision> --jq '.files[].filename'
   ```

   If `main` has moved on to code that is not in the release, wait for the next release rather than pinning it.

3. Set `dockerTag` to `ghcr.io/traceapps/cooktrace:latest@sha256:<index digest>`. Use the index (manifest list) digest, not a per-architecture one, so both `x86_64` and `aarch64` resolve.

4. Check that every variable `startos/main.ts` sets still exists with the same meaning: grep upstream's `server/` for each name (the `SMTP_*` names sit in a map in `server/email.js`, not after `process.env.`), and read its environment reference, `docs/cooktrace/env-vars.md` in `TraceApps/docs`. A renamed variable is ignored without an error.

5. Check that `setAdminScript` in `startos/utils.ts` still fits the image. It imports the image's own `/app/db.js`, `bcryptjs` and `/app/lib/claim-anonymous-data.js` (`claimAnonymousData`) and writes the `users` table directly, so a moved file, a renamed export or a changed `users` schema breaks **Set Admin Password** when it runs, not when the package builds. Any of these files in the release's diff needs reading:

   ```bash
   gh api repos/TraceApps/cooktrace/compare/v<old>...vX.Y.Z --jq '.files[].filename' \
     | grep -E '^server/(db\.js|lib/claim-anonymous-data\.js|package\.json)$'
   ```

6. Check that the setting keys and values **Set Regional Defaults** writes (`regionalSettings` and the option lists in `startos/utils.ts`) still match upstream's `src/stores/settings.js`, `src/i18n/index.js` (`AVAILABLE_LOCALES`), `src/components/settings/SettingsRegional.svelte` and `src/components/settings/SettingsFoodSources.svelte`. A renamed key or value is written without an error and ignored by CookTrace.
