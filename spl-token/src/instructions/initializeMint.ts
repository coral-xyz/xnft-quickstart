import { struct, u8 } from '@solana/buffer-layout';
import { publicKey } from '@solana/buffer-layout-utils';
import { AccountMeta, PublicKey, SYSVAR_RENT_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '../constants';
import {
    TokenInvalidInstructionDataError,
    TokenInvalidInstructionKeysError,
    TokenInvalidInstructionProgramError,
    TokenInvalidInstructionTypeError,
} from '../errors';
import { TokenInstruction } from './types';

/** TODO: docs */
export interface InitializeMintInstructionData {
    instruction: TokenInstruction.InitializeMint;
    decimals: number;
    mintAuthority: PublicKey;
    freezeAuthorityOption: 1 | 0;
    freezeAuthority: PublicKey;
}

/** TODO: docs */
export const initializeMintInstructionData = struct<InitializeMintInstructionData>([
    u8('instruction'),
    u8('decimals'),
    publicKey('mintAuthority'),
    u8('freezeAuthorityOption'),
    publicKey('freezeAuthority'),
]);

/**
 * Construct an InitializeMint instruction
 *
 * @param mint            Token mint account
 * @param decimals        Number of decimals in token account amounts
 * @param mintAuthority   Minting authority
 * @param freezeAuthority Optional authority that can freeze token accounts
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
export function createInitializeMintInstruction(
    mint: PublicKey,
    decimals: number,
    mintAuthority: PublicKey,
    freezeAuthority: PublicKey | null,
    programId = TOKEN_PROGRAM_ID
): TransactionInstruction {
    const keys = [
        { pubkey: mint, isSigner: false, isWritable: true },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    ];

    const data = Buffer.alloc(initializeMintInstructionData.span);
    initializeMintInstructionData.encode(
        {
            instruction: TokenInstruction.InitializeMint,
            decimals,
            mintAuthority,
            freezeAuthorityOption: freezeAuthority ? 1 : 0,
            freezeAuthority: freezeAuthority || new PublicKey(0),
        },
        data
    );

    return new TransactionInstruction({ keys, programId, data });
}

/** A decoded, valid InitializeMint instruction */
export interface DecodedInitializeMintInstruction {
    programId: PublicKey;
    keys: {
        mint: AccountMeta;
        rent: AccountMeta;
    };
    data: {
        instruction: TokenInstruction.InitializeMint;
        decimals: number;
        mintAuthority: PublicKey;
        freezeAuthority: PublicKey | null;
    };
}

/**
 * Decode an InitializeMint instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
export function decodeInitializeMintInstruction(
    instruction: TransactionInstruction,
    programId = TOKEN_PROGRAM_ID
): DecodedInitializeMintInstruction {
    if (!instruction.programId.equals(programId)) throw new TokenInvalidInstructionProgramError();
    if (instruction.data.length !== initializeMintInstructionData.span) throw new TokenInvalidInstructionDataError();

    const {
        keys: { mint, rent },
        data,
    } = decodeInitializeMintInstructionUnchecked(instruction);
    if (data.instruction !== TokenInstruction.InitializeMint) throw new TokenInvalidInstructionTypeError();
    if (!mint || !rent) throw new TokenInvalidInstructionKeysError();

    // TODO: key checks?

    return {
        programId,
        keys: {
            mint,
            rent,
        },
        data,
    };
}

/** A decoded, non-validated InitializeMint instruction */
export interface DecodedInitializeMintInstructionUnchecked {
    programId: PublicKey;
    keys: {
        mint: AccountMeta | undefined;
        rent: AccountMeta | undefined;
    };
    data: {
        instruction: number;
        decimals: number;
        mintAuthority: PublicKey;
        freezeAuthority: PublicKey | null;
    };
}

/**
 * Decode an InitializeMint instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
export function decodeInitializeMintInstructionUnchecked({
    programId,
    keys: [mint, rent],
    data,
}: TransactionInstruction): DecodedInitializeMintInstructionUnchecked {
    const { instruction, decimals, mintAuthority, freezeAuthorityOption, freezeAuthority } =
        initializeMintInstructionData.decode(data);

    return {
        programId,
        keys: {
            mint,
            rent,
        },
        data: {
            instruction,
            decimals,
            mintAuthority,
            freezeAuthority: freezeAuthorityOption ? freezeAuthority : null,
        },
    };
}
