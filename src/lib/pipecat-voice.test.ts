import { describe, expect, it } from 'vitest'
import { getPipecatVoiceBridgeStatus } from './pipecat-voice'

describe('getPipecatVoiceBridgeStatus', () => {
  it('marks the Gemini key as configured when the Google provider is configured', () => {
    const status = getPipecatVoiceBridgeStatus(
      { pipecat: { gemini_live_model: 'models/gemini-2.5-flash-native-audio-preview-12-2025' } },
      [{ id: 'google', configured: true }],
    )

    expect(status.geminiKeyConfigured).toBe(true)
    expect(status.pipecatConfigured).toBe(true)
  })

  it('detects missing bridge config and missing key separately', () => {
    const status = getPipecatVoiceBridgeStatus({}, [{ id: 'google', configured: false }])

    expect(status.geminiKeyConfigured).toBe(false)
    expect(status.pipecatConfigured).toBe(false)
  })
})
