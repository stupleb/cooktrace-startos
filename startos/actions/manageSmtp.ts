import { smtpPrefill } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const manageSmtp = sdk.Action.withInput(
  'manage-smtp',

  async ({ effects }) => ({
    name: i18n('Configure SMTP'),
    description: i18n(
      "Let CookTrace send email: password resets, invitations, shared-recipe notices and weekly summaries. CookTrace's Settings > Email (SMTP) shows it read-only. CookTrace restarts to apply it.",
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  sdk.InputSpec.of({ smtp: sdk.inputSpecConstants.smtpInputSpec }),

  async ({ effects }) => ({
    smtp: smtpPrefill(await storeJson.read((s) => s.smtp).const(effects)),
  }),

  async ({ effects, input }) => storeJson.merge(effects, { smtp: input.smtp }),
)
