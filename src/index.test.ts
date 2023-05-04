import { main } from './index'

describe(main, () => {
  it("should return 'Hello, world!'", async () => {
    const result = await main()

    expect(result).toBe('Hello, world!')
  })
})
