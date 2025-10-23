export function shouldBeHexString(value: string, name = 'value'): void {
  const hexRegex = /^(0x)[0-9a-f]+$/i

  if (!hexRegex.test(value.toLowerCase())) {
    throw new Error(`${name} should be a valid hex string, ${name}: ${value}`)
  }
}
