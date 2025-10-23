
export function shouldNotBeEmpty(value: unknown, name = 'value'): void {
  if (typeof value === 'number') {
    return
  }

  if (typeof value === 'boolean') {
    return
  }

  if (
    value === undefined ||
    value === null ||
    value === '' ||
    Object.keys(value).length === 0 ||
    (value as { length?: number }).length === 0
  ) {
    throw new Error(`${name} should not be empty, but ${name}: ${value}`)
  }
}
