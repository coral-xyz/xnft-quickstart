import { struct, u8 } from '@solana/buffer-layout';
import { u64 } from '@solana/buffer-layout-utils';
import { AccountMeta, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '../constants';
import {
    TokenInvalidInstructionDataError,
    TokenInvalidInstructionKeysError,
    TokenInvalidInstructionProgramError,
    TokenInvalidInstructionTypeError,
} from '../errors';
import { addSigners } from './internal';
import { TokenInstruction } from './types';

/** TODO: docs */
export interface BurnCheckedInstructionData {
    instruction: TokenInstruction.BurnChecked;
    amount: bigint;
    decimals: number;
}

/** TODO: docs */
export const burnCheckedInstructionData = struct<BurnCheckedInstructionData>([
    u8('instruction'),
    u64('amount'),
    u8('decimals'),
]);

/**
 * Construct a BurnChecked instruction
 *
 * @param mint         Mint for the account
 * @param account      Account to burn tokens from
 * @param owner        Owner of the account
 * @param amount       Number of tokens to burn
 * @param decimals     Number of decimals in burn amount
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
export function createBurnCheckedInstruction(
    account: PublicKey,
    mint: PublicKey,
    owner: PublicKey,
    amount: number | bigint,
    decimals: number,
    multiSigners: Signer[] = [],
    programId = TOKEN_PROGRAM_ID
): TransactionInstruction {
    const keys = addSigners(
        [
            { pubkey: account, isSigner: false, isWritable: true },
            { pubkey: mint, isSigner: false, isWritable: true },
        ],
        owner,
        multiSigners
    );

    const data = Buffer.alloc(burnCheckedInstructionData.span);
    burnCheckedInstructionData.encode(
        {
            instruction: TokenInstruction.BurnChecked,
            amount: BigInt(amount),
            decimals,
        },
        data
    );

    return new TransactionInstruction({ keys, programId, data });
}

/** A decoded, valid BurnChecked instruction */
export interface DecodedBurnCheckedInstruction {
    programId: PublicKey;
    keys: {
        account: AccountMeta;
        mint: AccountMeta;
        owner: AccountMeta;
        multiSigners: AccountMeta[];
    };
    data: {
        instruction: TokenInstruction.BurnChecked;
        amount: bigint;
        decimals: number;
    };
}

/**
 * Decode a BurnChecked instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
export function decodeBurnCheckedInstruction(
    instruction: TransactionInstruction,
    programId = TOKEN_PROGRAM_ID
): DecodedBurnCheckedInstruction {
    if (!instruction.programId.equals(programId)) throw new TokenInvalidInstructionProgramError();
    if (instruction.data.length !== burnCheckedInstructionData.span) throw new TokenInvalidInstructionDataError();

    const {
        keys: { account, mint, owner, multiSigners },
        data,
    } = decodeBurnCheckedInstructionUnchecked(instruction);
    if (data.instruction !== TokenInstruction.BurnChecked) throw new TokenInvalidInstructionTypeError();
    if (!account || !mint || !owner) throw new TokenInvalidInstructionKeysError();

    // TODO: key checks?

    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            multiSigners,
        },
        data,
    };
}

/** A decoded, non-validated BurnChecked instruction */
export interface DecodedBurnCheckedInstructionUnchecked {
    programId: PublicKey;
    keys: {
        account: AccountMeta | undefined;
        mint: AccountMeta | undefined;
        owner: AccountMeta | undefined;
        multiSigners: AccountMeta[];
    };
    data: {
        instruction: number;
        amount: bigint;
        decimals: number;
    };
}

/**
 * Decode a BurnChecked instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
export function decodeBurnCheckedInstructionUnchecked({
    programId,
    keys: [account, mint, owner, ...multiSigners],
    data,
}: TransactionInstruction): DecodedBurnCheckedInstructionUnchecked {
    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            multiSigners,
        },
        data: burnCheckedInstructionData.decode(data),
    };
}
