/**
 * Byte utilities matching @1inch/byte-utils patterns
 */

/**
 * Add 0x prefix to a hex string if it doesn't have one
 */
export function add0x(value: string): string {
  if (!value) return '0x'

  return value.startsWith('0x') ? value : `0x${value}`
}

/**
 * Remove 0x prefix from a hex string
 */
export function trim0x(value: string): string {
  if (!value) return ''

  return value.startsWith('0x') ? value.slice(2) : value
}

/**
 * Check if a value is a hex string (with or without 0x prefix)
 */
export function isHexString(value: string): boolean {
  if (!value) return false

  const stripped = trim0x(value)

  return /^[0-9a-fA-F]*$/.test(stripped)
}

/**
 * Check if a value is hex bytes (must have 0x prefix and even length)
 */
export function isHexBytes(value: string): boolean {
  if (!value || !value.startsWith('0x')) return false

  const stripped = value.slice(2)

  return stripped.length % 2 === 0 && /^[0-9a-fA-F]*$/.test(stripped)
}

/**
 * Get the byte count of a hex string
 */
export function getBytesCount(hex: string): number {
  const stripped = trim0x(hex)

  return Math.ceil(stripped.length / 2)
}

// Common max values
export const UINT_256_MAX = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
export const UINT_160_MAX = '0xffffffffffffffffffffffffffffffffffffffff'
export const UINT_40_MAX = '0xffffffffff'
export const UINT_32_MAX = '0xffffffff'
