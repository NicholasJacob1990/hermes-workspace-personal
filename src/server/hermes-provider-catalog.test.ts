import { describe, expect, it } from 'vitest'
import { HERMES_PROVIDERS } from './hermes-provider-catalog'

describe('Hermes provider catalog', () => {
  it('includes Google Gemini credentials for workspace configuration', () => {
    const google = HERMES_PROVIDERS.find((provider) => provider.id === 'google')

    expect(google).toBeDefined()
    expect(google?.envKeys).toEqual(['GOOGLE_API_KEY', 'GEMINI_API_KEY'])
  })
})
