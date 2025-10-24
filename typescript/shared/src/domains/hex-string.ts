import {trim0x} from '@1inch/byte-utils'
import {shouldBeString} from '../validators/should-be-string'
import {shouldNotBeEmpty} from '../validators/should-not-be-empty'
import {shouldBeHexString} from '../validators/should-be-hex-string'

export class HexString {
    private readonly hexString: string

    constructor(hex: string, name = '') {
        this.hexString = String(hex)

        shouldBeString(this.hexString, `hexString ${name}`)
        shouldNotBeEmpty(this.hexString, `hexString ${name}`)
        shouldBeHexString(this.hexString, `hexString ${name}`)
    }

    static fromBigInt(bigInt: bigint, name?: string): HexString {
        return new HexString(`0x${bigInt.toString(16)}`, name)
    }

    static fromUnknown(val: unknown, name?: string): HexString {
        if (typeof val === 'bigint') {
            return HexString.fromBigInt(val, name)
        }

        if (typeof val === 'string') {
            return new HexString(val, name)
        }

        throw new Error(`Invalid hex string${name ? ' ' + name : ''}`)
    }

    toBigInt(): bigint {
        return BigInt(this.hexString)
    }

    toString(): `0x${string}` {
        return `0x${trim0x(this.hexString)}`
    }

    toJSON(): string {
        return this.hexString
    }
}
