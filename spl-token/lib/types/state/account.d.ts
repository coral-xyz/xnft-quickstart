import { Commitment, Connection, PublicKey } from '@solana/web3.js';
/** Information about a token account */
export interface Account {
    /** Address of the account */
    address: PublicKey;
    /** Mint associated with the account */
    mint: PublicKey;
    /** Owner of the account */
    owner: PublicKey;
    /** Number of tokens the account holds */
    amount: bigint;
    /** Authority that can transfer tokens from the account */
    delegate: PublicKey | null;
    /** Number of tokens the delegate is authorized to transfer */
    delegatedAmount: bigint;
    /** True if the account is initialized */
    isInitialized: boolean;
    /** True if the account is frozen */
    isFrozen: boolean;
    /** True if the account is a native token account */
    isNative: boolean;
    /**
     * If the account is a native token account, it must be rent-exempt. The rent-exempt reserve is the amount that must
     * remain in the balance until the account is closed.
     */
    rentExemptReserve: bigint | null;
    /** Optional authority to close the account */
    closeAuthority: PublicKey | null;
}
/** Token account state as stored by the program */
export declare enum AccountState {
    Uninitialized = 0,
    Initialized = 1,
    Frozen = 2
}
/** Token account as stored by the program */
export interface RawAccount {
    mint: PublicKey;
    owner: PublicKey;
    amount: bigint;
    delegateOption: 1 | 0;
    delegate: PublicKey;
    state: AccountState;
    isNativeOption: 1 | 0;
    isNative: bigint;
    delegatedAmount: bigint;
    closeAuthorityOption: 1 | 0;
    closeAuthority: PublicKey;
}
/** Buffer layout for de/serializing a token account */
export declare const AccountLayout: import("@solana/buffer-layout").Structure<RawAccount>;
/** Byte length of a token account */
export declare const ACCOUNT_SIZE: number;
/**
 * Retrieve information about a token account
 *
 * @param connection Connection to use
 * @param address    Token account
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Token account information
 */
export declare function getAccount(connection: Connection, address: PublicKey, commitment?: Commitment, programId?: PublicKey): Promise<Account>;
/** Get the minimum lamport balance for a token account to be rent exempt
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */
export declare function getMinimumBalanceForRentExemptAccount(connection: Connection, commitment?: Commitment): Promise<number>;
