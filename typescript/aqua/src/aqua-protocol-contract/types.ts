import { Address, HexString } from '@1inch/sdk-shared'

/**
 * Aqua Protocol types for the 4 core methods
 */

export type ShipArgs = {
  app: Address
  strategy: HexString
  tokens: Address[]
  amounts: bigint[]
}

export type DockArgs = {
  app: Address
  strategyHash: HexString // should be as keccak256(strategy)
  tokens: Address[]
}

export type PullArgs = {
  maker: Address
  strategyHash: HexString
  token: Address
  amount: bigint
  to: Address
}

export type PushArgs = {
  maker: Address
  app: Address
  strategyHash: HexString // should be as keccak256(strategy)
  token: Address
  amount: bigint
}
