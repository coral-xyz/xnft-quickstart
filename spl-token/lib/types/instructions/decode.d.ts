import { TransactionInstruction } from '@solana/web3.js';
import { DecodedApproveInstruction } from './approve';
import { DecodedApproveCheckedInstruction } from './approveChecked';
import { DecodedBurnInstruction } from './burn';
import { DecodedBurnCheckedInstruction } from './burnChecked';
import { DecodedCloseAccountInstruction } from './closeAccount';
import { DecodedFreezeAccountInstruction } from './freezeAccount';
import { DecodedInitializeAccountInstruction } from './initializeAccount';
import { DecodedInitializeMintInstruction } from './initializeMint';
import { DecodedInitializeMultisigInstruction } from './initializeMultisig';
import { DecodedMintToInstruction } from './mintTo';
import { DecodedMintToCheckedInstruction } from './mintToChecked';
import { DecodedRevokeInstruction } from './revoke';
import { DecodedSetAuthorityInstruction } from './setAuthority';
import { DecodedSyncNativeInstruction } from './syncNative';
import { DecodedThawAccountInstruction } from './thawAccount';
import { DecodedTransferInstruction } from './transfer';
import { DecodedTransferCheckedInstruction } from './transferChecked';
/** TODO: docs */
export declare type DecodedInstruction = DecodedInitializeMintInstruction | DecodedInitializeAccountInstruction | DecodedInitializeMultisigInstruction | DecodedTransferInstruction | DecodedApproveInstruction | DecodedRevokeInstruction | DecodedSetAuthorityInstruction | DecodedMintToInstruction | DecodedBurnInstruction | DecodedCloseAccountInstruction | DecodedFreezeAccountInstruction | DecodedThawAccountInstruction | DecodedTransferCheckedInstruction | DecodedApproveCheckedInstruction | DecodedMintToCheckedInstruction | DecodedBurnCheckedInstruction | DecodedSyncNativeInstruction | never;
/** TODO: docs */
export declare function decodeInstruction(instruction: TransactionInstruction, programId?: import("@solana/web3.js").PublicKey): DecodedInstruction;
/** TODO: docs */
export declare function isInitializeMintInstruction(decoded: DecodedInstruction): decoded is DecodedInitializeMintInstruction;
/** TODO: docs */
export declare function isInitializeAccountInstruction(decoded: DecodedInstruction): decoded is DecodedInitializeAccountInstruction;
/** TODO: docs */
export declare function isInitializeMultisigInstruction(decoded: DecodedInstruction): decoded is DecodedInitializeMultisigInstruction;
/** TODO: docs */
export declare function isTransferInstruction(decoded: DecodedInstruction): decoded is DecodedTransferInstruction;
/** TODO: docs */
export declare function isApproveInstruction(decoded: DecodedInstruction): decoded is DecodedApproveInstruction;
/** TODO: docs */
export declare function isRevokeInstruction(decoded: DecodedInstruction): decoded is DecodedRevokeInstruction;
/** TODO: docs */
export declare function isSetAuthorityInstruction(decoded: DecodedInstruction): decoded is DecodedSetAuthorityInstruction;
/** TODO: docs */
export declare function isMintToInstruction(decoded: DecodedInstruction): decoded is DecodedMintToInstruction;
/** TODO: docs */
export declare function isBurnInstruction(decoded: DecodedInstruction): decoded is DecodedBurnInstruction;
/** TODO: docs */
export declare function isCloseAccountInstruction(decoded: DecodedInstruction): decoded is DecodedCloseAccountInstruction;
/** TODO: docs */
export declare function isFreezeAccountInstruction(decoded: DecodedInstruction): decoded is DecodedFreezeAccountInstruction;
/** TODO: docs */
export declare function isThawAccountInstruction(decoded: DecodedInstruction): decoded is DecodedThawAccountInstruction;
/** TODO: docs */
export declare function isTransferCheckedInstruction(decoded: DecodedInstruction): decoded is DecodedTransferCheckedInstruction;
/** TODO: docs */
export declare function isApproveCheckedInstruction(decoded: DecodedInstruction): decoded is DecodedApproveCheckedInstruction;
/** TODO: docs */
export declare function isMintToCheckedInstruction(decoded: DecodedInstruction): decoded is DecodedMintToCheckedInstruction;
/** TODO: docs */
export declare function isBurnCheckedInstruction(decoded: DecodedInstruction): decoded is DecodedBurnCheckedInstruction;
/** TODO: docs, implement */
/** TODO: docs */
export declare function isSyncNativeInstruction(decoded: DecodedInstruction): decoded is DecodedSyncNativeInstruction;
/** TODO: docs, implement */
/** TODO: docs, implement */
/** TODO: docs, implement */
