import { shouldBeString } from './should-be-string'

describe('Unit Test ', () => {
  test('should throw error because string should not be undefined', async () => {
    expect(() => shouldBeString(undefined)).toThrow()
  })

  test('should throw error because string should not be null', async () => {
    expect(() => shouldBeString(null)).toThrow()
  })

  test('should throw error because string should not be bool', async () => {
    expect(() => shouldBeString(true)).toThrow()
  })

  test('should throw error because string should not be number', async () => {
    expect(() => shouldBeString(121)).toThrow()
  })

  test('should throw error because string should not be array', async () => {
    expect(() => shouldBeString([121])).toThrow()
  })

  test('should throw error because string should not be object', async () => {
    expect(() => shouldBeString({ a: 123 })).toThrow()
  })

  test('should validate because string is valid', async () => {
    expect(() => shouldBeString('I am the string !')).not.toThrow()
  })

  test('should validate because empty string is valid', async () => {
    expect(() => shouldBeString('')).not.toThrow()
  })
})
