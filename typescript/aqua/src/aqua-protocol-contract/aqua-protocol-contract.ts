import { encodeFunctionData, decodeFunctionResult, keccak256, Hash } from 'viem'
import { CallInfo, Address, HexString } from '@1inch/sdk-shared'
import { AQUA_PROTOCOL_ABI } from './abi'
import { ShipArgs, DockArgs, PullArgs, PushArgs } from './types'

/**
 * Aqua Protocol Contract - Encoding/decoding for ship, dock, push, pull
 *
 * This class provides methods to encode and decode calldata for the Aqua Protocol
 * smart contract's core functions.
 */
export class AquaProtocolContract {
  /**
   * Encodes the calldata for the ship function
   * @param args - Ship arguments containing app address, strategy, tokens, and amounts
   * @returns Encoded calldata as HexString
   * @example
   * ```typescript
   * const args: ShipArgs = {
   *   app: new Address('0x...'),
   *   strategy: '0x1234...' as Hex,
   *   tokens: [new Address('0x...')],
   *   amounts: [BigInt(1000)]
   * }
   * const calldata = AquaProtocolContract.encodeShipCallData(args)
   * ```
   * @see https://github.com/1inch/aqua-protocol/blob/master/src/Aqua.sol#L34
   */
  static encodeShipCallData(args: ShipArgs): HexString {
    const { app, strategy, tokens, amounts } = args
    console.log('--again args ', { app, strategy, tokens, amounts })
    const [result] = encodeFunctionData({
      abi: AQUA_PROTOCOL_ABI,
      functionName: 'ship',
      args: [app.toString(), strategy.toString(), tokens, []],
    })

    return new HexString(result)
  }

  /**
   * Decodes the result from a ship function call
   * @param data - The encoded result data from the ship transaction
   * @returns The strategy hash as a HexString
   */
  static decodeShipResult(data: HexString): HexString {
    const [result] = decodeFunctionResult({
      abi: AQUA_PROTOCOL_ABI,
      functionName: 'ship',
      data: data.toString(),
    }) as `0x${string}`

    return new HexString(result)
  }

  /**
   * Encodes the calldata for the dock function
   * @param args - Dock arguments containing app address, strategy hash, and tokens
   * @returns Encoded calldata as HexString
   * @example
   * ```typescript
   * const args: DockArgs = {
   *   app: new Address('0x...'),
   *   strategyHash: '0xabc...' as Hex,
   *   tokens: [new Address('0x...')]
   * }
   * const calldata = AquaProtocolContract.encodeDockCallData(args)
   * ```
   * @see https://github.com/1inch/aqua-protocol/blob/master/src/Aqua.sol#L49
   */
  static encodeDockCallData(args: DockArgs): HexString {
    const { app, strategyHash, tokens } = args

    const [result] = encodeFunctionData({
      abi: AQUA_PROTOCOL_ABI,
      functionName: 'dock',
      args: [app, strategyHash, tokens],
    })

    return new HexString(result)
  }

  /**
   * Encodes the calldata for the pull function
   * @param args - Pull arguments containing maker, strategy hash, token, amount, and recipient
   * @returns Encoded calldata as HexString
   * @example
   * ```typescript
   * const args: PullArgs = {
   *   maker: new Address('0x...'),
   *   strategyHash: '0xabc...' as Hex,
   *   token: new Address('0x...'),
   *   amount: BigInt(1000),
   *   to: new Address('0x...')
   * }
   * const calldata = AquaProtocolContract.encodePullCallData(args)
   * ```
   * @see https://github.com/1inch/aqua-protocol/blob/master/src/Aqua.sol#L59
   */
  static encodePullCallData(args: PullArgs): HexString {
    const { maker, strategyHash, token, amount, to } = args

    const [result] = encodeFunctionData({
      abi: AQUA_PROTOCOL_ABI,
      functionName: 'pull',
      args: [maker, strategyHash, token, amount, to],
    })

    return new HexString(result)
  }

  /**
   * Encodes the calldata for the push function
   * @param args - Push arguments containing maker, app, strategy hash, token, and amount
   * @returns Encoded calldata as HexString
   * @example
   * ```typescript
   * const args: PushArgs = {
   *   maker: new Address('0x...'),
   *   app: new Address('0x...'),
   *   strategyHash: '0xabc...' as Hex,
   *   token: new Address('0x...'),
   *   amount: BigInt(1000)
   * }
   * const calldata = AquaProtocolContract.encodePushCallData(args)
   * ```
   * @see https://github.com/1inch/aqua-protocol/blob/master/src/Aqua.sol#L69
   */
  static encodePushCallData(args: PushArgs): HexString {
    const { maker, app, strategyHash, token, amount } = args

    const [result] = encodeFunctionData({
      abi: AQUA_PROTOCOL_ABI,
      functionName: 'push',
      args: [maker, app, strategyHash, token, amount],
    })

    return new HexString(result)
  }

  /**
   * Builds a complete transaction object for the ship function
   * @param contractAddress - The Aqua protocol contract address
   * @param params - Ship arguments
   * @returns Transaction call info with to, data, and value fields
   */
  static buildShipTx(contractAddress: Address, params: ShipArgs): CallInfo {
    return {
      to: contractAddress.toString(),
      data: this.encodeShipCallData(params).toString(),
      value: 0n,
    }
  }

  /**
   * Builds a complete transaction object for the dock function
   * @param contractAddress - The Aqua protocol contract address
   * @param params - Dock arguments
   * @returns Transaction call info with to, data, and value fields
   */
  static buildDockTx(contractAddress: Address, params: DockArgs): CallInfo {
    return {
      to: contractAddress.toString(),
      data: this.encodeDockCallData(params).toString(),
      value: 0n,
    }
  }

  /**
   * Builds a complete transaction object for the pull function
   * @param contractAddress - The Aqua protocol contract address
   * @param params - Pull arguments
   * @returns Transaction call info with to, data, and value fields
   */
  static buildPullTx(contractAddress: Address, params: PullArgs): CallInfo {
    return {
      to: contractAddress.toString(),
      data: this.encodePullCallData(params).toString(),
      value: 0n,
    }
  }

  /**
   * Builds a complete transaction object for the push function
   * @param contractAddress - The Aqua protocol contract address
   * @param params - Push arguments
   * @returns Transaction call info with to, data, and value fields
   */
  static buildPushTx(contractAddress: Address, params: PushArgs): CallInfo {
    return {
      to: contractAddress.toString(),
      data: this.encodePushCallData(params).toString(),
      value: 0n,
    }
  }

  /**
   * Calculate strategy hash from strategy bytes
   * @param strategy Strategy bytes
   * @returns Strategy hash
   */
  static calculateStrategyHash(strategy: HexString): Hash {
    return keccak256(strategy.toString())
  }
}
