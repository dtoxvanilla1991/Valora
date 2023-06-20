import { main } from './index'

describe(main, () => {
  it('should return the distance with a valid range', async () => {
    const validDistance = 10185158
    const result = await main([
      'New York, NY, USA',
      '35.389,-79.1455',
      'San Francisco, CA, USA',
      '18.4796,-89.3848',
    ])

    expect(result).toBeLessThanOrEqual(validDistance * 1.1)
    expect(result).toBeGreaterThanOrEqual(validDistance * 0.9)
  })
})
