import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'cooktrace',
  title: 'CookTrace',
  license: 'AGPL-3.0',
  packageRepo: 'https://github.com/stupleb/cooktrace-startos',
  upstreamRepo: 'https://github.com/TraceApps/cooktrace',
  marketingUrl: 'https://traceapps.github.io/docs/cooktrace/',
  donationUrl: 'https://ko-fi.com/traceapps',
  description: { short, long },
  volumes: ['main', 'startos'],
  images: {
    cooktrace: {
      source: {
        dockerTag:
          'ghcr.io/traceapps/cooktrace:latest@sha256:23aab754ad3c4c4ca3ee95f6c5765cf81f2b89453d827a517b50db6751de9a52',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
