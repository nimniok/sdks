
export function shouldBeString(value: unknown, name = 'value'): void {
  if (value === undefined || value === null) {
    throw new Error(`${name} should be a valid string, but ${name}: ${value}`)
  }

  if (typeof value !== 'string') {
    throw new Error(`${name} should be a valid string, but ${name}: ${value}`)
  }
}
