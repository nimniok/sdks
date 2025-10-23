import { shouldNotBeEmpty } from './should-not-be-empty'

describe('Unit Test shouldHaveSizeMore', () => {
  test('should throw error because value should not be undefined', async () => {
    expect(() => shouldNotBeEmpty(undefined)).toThrow()
  })

  test('should throw error because value should not be null', async () => {
    expect(() => shouldNotBeEmpty(null)).toThrow()
  })

  test('should throw error because value should not be empty string', async () => {
    expect(() => shouldNotBeEmpty('')).toThrow()
  })

  test('should throw error because value should not be empty array', async () => {
    expect(() => shouldNotBeEmpty([])).toThrow()
  })

  test('should throw error because value should not be empty object', async () => {
    expect(() => shouldNotBeEmpty({})).toThrow()
  })

  test('should not throw error because value is number', async () => {
    expect(() => shouldNotBeEmpty(0)).not.toThrow()
  })

  test('should not throw error because value is boolean', async () => {
    expect(() => shouldNotBeEmpty(true)).not.toThrow()
  })

  test('should not throw error because value is not empty string', async () => {
    expect(() => shouldNotBeEmpty('I am the string')).not.toThrow()
  })

  test('should not throw error because value is not empty array', async () => {
    expect(() => shouldNotBeEmpty([true])).not.toThrow()
  })

  test('should not throw error because value is not empty object', async () => {
    expect(() => shouldNotBeEmpty({ a: 123 })).not.toThrow()
  })
})
