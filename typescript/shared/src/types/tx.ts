import type { Address } from '../domains/address'

/**
 * Call info type for transaction data
 * Matching limit-order-sdk pattern
 */
export type CallInfo = {
  to: string | Address
  data: string
  value: bigint
}