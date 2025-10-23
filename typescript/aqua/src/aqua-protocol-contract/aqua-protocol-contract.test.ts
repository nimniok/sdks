import {describe, it, expect} from 'vitest'
import {Address, HexString} from '@1inch/sdk-shared'
// import {encodeFunctionData} from 'viem'
import type {ShipArgs} from './types'
// import {AQUA_PROTOCOL_ABI} from './abi'
import {AquaProtocolContract} from './aqua-protocol-contract'

describe('AquaProtocolContract', () => {
    const mockApp = Address.fromBigInt(1n)
    // const mockMaker = Address.fromBigInt(2n)
    const mockToken = Address.fromBigInt(3n)
    // const mockTo = Address.fromBigInt(4n)
    // const mockContractAddress = Address.fromBigInt(5n)

    const mockStrategy = new HexString('0x01020304')
    // const mockStrategyHash =
    //     AquaProtocolContract.calculateStrategyHash(mockStrategy)
    const mockAmount = BigInt(1000)
    const mockAmounts = [mockAmount, BigInt(2000)]
    const mockTokens = [mockToken, Address.fromBigInt(6n)]

    describe('encodeShipCallData', () => {
        it('should encode ship function call data correctly', () => {
            const args: ShipArgs = {
                app: mockApp,
                strategy: mockStrategy,
                tokens: mockTokens,
                amounts: mockAmounts
            }

            const result = AquaProtocolContract.encodeShipCallData(args)

            expect(result).toBeInstanceOf(HexString)
            // expect(result.toString().startsWith('0x')).toBe(true)
            //
            // // Compare with direct viem encoding
            // const expectedCalldata = encodeFunctionData({
            //     abi: AQUA_PROTOCOL_ABI,
            //     functionName: 'ship',
            //     args: [
            //         mockApp.toString(),
            //         mockStrategy,
            //         mockTokens.map((t) => t.toString()),
            //         mockAmounts
            //     ]
            // })
            //
            // expect(result.toString()).toBe(expectedCalldata)
        })
    })

    // describe('decodeShipResult', () => {
    //     it('should decode ship function result correctly', () => {
    //         // Mock encoded result (strategy hash)
    //         const encodedResult = new HexString('0x' + 'a'.repeat(64))
    //
    //         // This would normally decode the result, but we need to mock it
    //         // For testing purposes, we'll verify the function structure
    //         expect(() => {
    //             AquaProtocolContract.decodeShipResult(encodedResult)
    //         }).not.toThrow()
    //     })
    // })
    //
    // describe('encodeDockCallData', () => {
    //     it('should encode dock function calldata correctly', () => {
    //         const args: DockArgs = {
    //             app: mockApp,
    //             strategyHash: mockStrategyHash,
    //             tokens: mockTokens
    //         }
    //
    //         const result = AquaProtocolContract.encodeDockCallData(args)
    //
    //         expect(result).toBeInstanceOf(HexString)
    //         expect(result.toString().startsWith('0x')).toBe(true)
    //
    //         // Compare with direct viem encoding
    //         const expectedCalldata = encodeFunctionData({
    //             abi: AQUA_PROTOCOL_ABI,
    //             functionName: 'dock',
    //             args: [
    //                 mockApp.toString(),
    //                 mockStrategyHash,
    //                 mockTokens.map((t) => t.toString())
    //             ]
    //         })
    //
    //         expect(result.toString()).toBe(expectedCalldata)
    //     })
    // })
    //
    // describe('encodePullCallData', () => {
    //     it('should encode pull function calldata correctly', () => {
    //         const args: PullArgs = {
    //             maker: mockMaker,
    //             strategyHash: mockStrategyHash,
    //             token: mockToken,
    //             amount: mockAmount,
    //             to: mockTo
    //         }
    //
    //         const result = AquaProtocolContract.encodePullCallData(args)
    //
    //         expect(result).toBeInstanceOf(HexString)
    //         expect(result.toString().startsWith('0x')).toBe(true)
    //
    //         // Compare with direct viem encoding
    //         const expectedCalldata = encodeFunctionData({
    //             abi: AQUA_PROTOCOL_ABI,
    //             functionName: 'pull',
    //             args: [
    //                 mockMaker.toString(),
    //                 mockStrategyHash,
    //                 mockToken.toString(),
    //                 mockAmount,
    //                 mockTo.toString()
    //             ]
    //         })
    //
    //         expect(result.toString()).toBe(expectedCalldata)
    //     })
    // })
    //
    // describe('encodePushCallData', () => {
    //     it('should encode push function calldata correctly', () => {
    //         const args: PushArgs = {
    //             maker: mockMaker,
    //             app: mockApp,
    //             strategyHash: mockStrategyHash,
    //             token: mockToken,
    //             amount: mockAmount
    //         }
    //
    //         const result = AquaProtocolContract.encodePushCallData(args)
    //
    //         expect(result).toBeInstanceOf(HexString)
    //         expect(result.toString().startsWith('0x')).toBe(true)
    //
    //         // Compare with direct viem encoding
    //         const expectedCalldata = encodeFunctionData({
    //             abi: AQUA_PROTOCOL_ABI,
    //             functionName: 'push',
    //             args: [
    //                 mockMaker.toString(),
    //                 mockApp.toString(),
    //                 mockStrategyHash,
    //                 mockToken.toString(),
    //                 mockAmount
    //             ]
    //         })
    //
    //         expect(result.toString()).toBe(expectedCalldata)
    //     })
    // })
    //
    // describe('buildShipTx', () => {
    //     it('should build ship transaction correctly', () => {
    //         const args: ShipArgs = {
    //             app: mockApp,
    //             strategy: mockStrategy,
    //             tokens: mockTokens,
    //             amounts: mockAmounts
    //         }
    //
    //         const tx = AquaProtocolContract.buildShipTx(
    //             mockContractAddress,
    //             args
    //         )
    //
    //         expect(tx).toBeDefined()
    //         expect(tx.to).toBe(mockContractAddress.toString())
    //         expect(tx.data).toBeInstanceOf(HexString)
    //         expect(tx.value).toBe(0n)
    //     })
    // })
    //
    // describe('buildDockTx', () => {
    //     it('should build dock transaction correctly', () => {
    //         const args: DockArgs = {
    //             app: mockApp,
    //             strategyHash: mockStrategyHash,
    //             tokens: mockTokens
    //         }
    //
    //         const tx = AquaProtocolContract.buildDockTx(
    //             mockContractAddress,
    //             args
    //         )
    //
    //         expect(tx).toBeDefined()
    //         expect(tx.to).toBe(mockContractAddress.toString())
    //         expect(tx.data).toBeInstanceOf(HexString)
    //         expect(tx.value).toBe(0n)
    //     })
    // })
    //
    // describe('buildPullTx', () => {
    //     it('should build pull transaction correctly', () => {
    //         const args: PullArgs = {
    //             maker: mockMaker,
    //             strategyHash: mockStrategyHash,
    //             token: mockToken,
    //             amount: mockAmount,
    //             to: mockTo
    //         }
    //
    //         const tx = AquaProtocolContract.buildPullTx(
    //             mockContractAddress,
    //             args
    //         )
    //
    //         expect(tx).toBeDefined()
    //         expect(tx.to).toBe(mockContractAddress.toString())
    //         expect(tx.data).toBeInstanceOf(HexString)
    //         expect(tx.value).toBe(0n)
    //     })
    // })
    //
    // describe('buildPushTx', () => {
    //     it('should build push transaction correctly', () => {
    //         const args: PushArgs = {
    //             maker: mockMaker,
    //             app: mockApp,
    //             strategyHash: mockStrategyHash,
    //             token: mockToken,
    //             amount: mockAmount
    //         }
    //
    //         const tx = AquaProtocolContract.buildPushTx(
    //             mockContractAddress,
    //             args
    //         )
    //
    //         expect(tx).toBeDefined()
    //         expect(tx.to).toBe(mockContractAddress.toString())
    //         expect(tx.data).toBeInstanceOf(HexString)
    //         expect(tx.value).toBe(0n)
    //     })
    // })
    //
    // describe('calculateStrategyHash', () => {
    //     it('should calculate strategy hash correctly', () => {
    //         const strategy = new HexString('0x01020304')
    //
    //         const hash = AquaProtocolContract.calculateStrategyHash(strategy)
    //
    //         expect(hash).toBeDefined()
    //         expect(typeof hash).toBe('string')
    //         expect(hash.startsWith('0x')).toBe(true)
    //         expect(hash.length).toBe(66) // 0x + 64 hex chars
    //     })
    //
    //     it('should produce consistent hashes for the same input', () => {
    //         const strategy = new HexString('0x01020304')
    //
    //         const hash1 = AquaProtocolContract.calculateStrategyHash(strategy)
    //         const hash2 = AquaProtocolContract.calculateStrategyHash(strategy)
    //
    //         expect(hash1).toBe(hash2)
    //     })
    //
    //     it('should produce different hashes for different inputs', () => {
    //         const strategy1 = new HexString('0x01020304')
    //         const strategy2 = new HexString('0x05060708')
    //
    //         const hash1 = AquaProtocolContract.calculateStrategyHash(strategy1)
    //         const hash2 = AquaProtocolContract.calculateStrategyHash(strategy2)
    //
    //         expect(hash1).not.toBe(hash2)
    //     })
    // })
})
