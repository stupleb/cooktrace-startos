import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import {
  applyRegionalScript,
  cooktraceDefaults,
  dbMount,
  dbPath,
  foodCountries,
  foodLanguages,
  regionalSettings,
  uiLanguages,
} from '../utils'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  fill: Value.toggle({
    name: i18n('Apply to accounts without their own settings'),
    description: i18n(
      "When on, CookTrace fills these in now for every account that hasn't set them itself, and for new accounts each time it starts. Turn off to stop; settings already filled in stay as they are.",
    ),
    default: true,
  }),
  language: Value.select({
    name: i18n('Language'),
    description: i18n('The language CookTrace opens in.'),
    default: cooktraceDefaults.language,
    values: uiLanguages,
  }),
  units: Value.select({
    name: i18n('Measurement system'),
    description: i18n(
      'Which units CookTrace lists first when you pick an ingredient unit, and which units Trace AI uses.',
    ),
    default: cooktraceDefaults.units,
    values: {
      metric: i18n('Metric (g, ml, °C)'),
      imperial: i18n('Imperial (oz, cup, lb, °F)'),
    },
  }),
  energy: Value.select({
    name: i18n('Energy'),
    description: null,
    default: cooktraceDefaults.energy,
    values: {
      kcal: i18n('Calories (kcal)'),
      kJ: i18n('Kilojoules (kJ)'),
    },
  }),
  dateFormat: Value.select({
    name: i18n('Date format'),
    description: null,
    default: cooktraceDefaults.dateFormat,
    values: {
      ISO: 'YYYY-MM-DD',
      EU: 'DD/MM/YYYY',
      US: 'MM/DD/YYYY',
      natural: 'D MMM YYYY',
    },
  }),
  timeFormat: Value.select({
    name: i18n('Time format'),
    description: null,
    default: cooktraceDefaults.timeFormat,
    values: {
      '24h': i18n('24-hour'),
      '12h': i18n('12-hour'),
    },
  }),
  foodCountry: Value.select({
    name: i18n('Food search country'),
    description: i18n(
      'Open Food Facts searches show only products sold in this country.',
    ),
    default: cooktraceDefaults.foodCountry,
    values: Object.fromEntries([
      ['World', i18n('Anywhere')],
      ...foodCountries.map((c) => [c, c]),
    ]),
  }),
  foodLanguage: Value.select({
    name: i18n('Food search language'),
    description: i18n(
      'Open Food Facts searches show products in this language, with their names in it where available.',
    ),
    default: cooktraceDefaults.foodLanguage,
    values: foodLanguages,
  }),
})

export const setRegionalDefaults = sdk.Action.withInput(
  'set-regional-defaults',

  async ({ effects }) => ({
    name: i18n('Set Regional Defaults'),
    description: i18n(
      'Choose the language, measurement system, date and time formats and food search region that CookTrace accounts start with. It fills them in for every account that has not chosen them, now and each time CookTrace starts, and never changes a choice someone has made.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => {
    const stored = await storeJson
      .read((s) => s.regionalDefaults)
      .const(effects)
    return { fill: !!stored, ...(stored ?? cooktraceDefaults) }
  },

  async ({ effects, input: { fill, ...defaults } }) => {
    if (!fill) {
      await storeJson.merge(effects, { regionalDefaults: null })
      return {
        version: '1',
        title: i18n('Regional Defaults Turned Off'),
        message: i18n(
          'CookTrace no longer fills in regional defaults. Settings already filled in stay as they are.',
        ),
        result: null,
      }
    }
    const previous = await storeJson.read((s) => s.regionalDefaults).once()
    const { stdout } = await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'cooktrace' },
      dbMount,
      'set-regional-defaults',
      (sub) =>
        sub.execFail(
          ['node', '--input-type=module', '-e', applyRegionalScript],
          {
            cwd: '/app',
            env: {
              DB_PATH: dbPath,
              SETTINGS: JSON.stringify(regionalSettings(defaults)),
              PREVIOUS: JSON.stringify(
                previous ? regionalSettings(previous) : {},
              ),
            },
            timeout: 60_000,
          },
        ),
    )
    await storeJson.merge(effects, { regionalDefaults: defaults })

    return {
      version: '1',
      title: i18n('Regional Defaults Saved'),
      message: i18n(
        'CookTrace filled in ${count} settings for accounts that had not chosen them. Accounts created later get them the next time CookTrace starts.',
        { count: Number(String(stdout).match(/\d+/)?.[0] ?? 0) },
      ),
      result: null,
    }
  },
)
