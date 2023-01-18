"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSyncNativeInstruction = exports.isBurnCheckedInstruction = exports.isMintToCheckedInstruction = exports.isApproveCheckedInstruction = exports.isTransferCheckedInstruction = exports.isThawAccountInstruction = exports.isFreezeAccountInstruction = exports.isCloseAccountInstruction = exports.isBurnInstruction = exports.isMintToInstruction = exports.isSetAuthorityInstruction = exports.isRevokeInstruction = exports.isApproveInstruction = exports.isTransferInstruction = exports.isInitializeMultisigInstruction = exports.isInitializeAccountInstruction = exports.isInitializeMintInstruction = exports.decodeInstruction = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const approve_1 = require("./approve");
const approveChecked_1 = require("./approveChecked");
const burn_1 = require("./burn");
const burnChecked_1 = require("./burnChecked");
const closeAccount_1 = require("./closeAccount");
const freezeAccount_1 = require("./freezeAccount");
const initializeAccount_1 = require("./initializeAccount");
const initializeMint_1 = require("./initializeMint");
const initializeMultisig_1 = require("./initializeMultisig");
const mintTo_1 = require("./mintTo");
const mintToChecked_1 = require("./mintToChecked");
const revoke_1 = require("./revoke");
const setAuthority_1 = require("./setAuthority");
const syncNative_1 = require("./syncNative");
const thawAccount_1 = require("./thawAccount");
const transfer_1 = require("./transfer");
const transferChecked_1 = require("./transferChecked");
const types_1 = require("./types");
/** TODO: docs */
function decodeInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.data.length)
        throw new errors_1.TokenInvalidInstructionDataError();
    const type = (0, buffer_layout_1.u8)().decode(instruction.data);
    if (type === types_1.TokenInstruction.InitializeMint)
        return (0, initializeMint_1.decodeInitializeMintInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.InitializeAccount)
        return (0, initializeAccount_1.decodeInitializeAccountInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.InitializeMultisig)
        return (0, initializeMultisig_1.decodeInitializeMultisigInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.Transfer)
        return (0, transfer_1.decodeTransferInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.Approve)
        return (0, approve_1.decodeApproveInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.Revoke)
        return (0, revoke_1.decodeRevokeInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.SetAuthority)
        return (0, setAuthority_1.decodeSetAuthorityInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.MintTo)
        return (0, mintTo_1.decodeMintToInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.Burn)
        return (0, burn_1.decodeBurnInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.CloseAccount)
        return (0, closeAccount_1.decodeCloseAccountInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.FreezeAccount)
        return (0, freezeAccount_1.decodeFreezeAccountInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.ThawAccount)
        return (0, thawAccount_1.decodeThawAccountInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.TransferChecked)
        return (0, transferChecked_1.decodeTransferCheckedInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.ApproveChecked)
        return (0, approveChecked_1.decodeApproveCheckedInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.MintToChecked)
        return (0, mintToChecked_1.decodeMintToCheckedInstruction)(instruction, programId);
    if (type === types_1.TokenInstruction.BurnChecked)
        return (0, burnChecked_1.decodeBurnCheckedInstruction)(instruction, programId);
    // TODO: implement
    if (type === types_1.TokenInstruction.InitializeAccount2)
        throw new errors_1.TokenInvalidInstructionTypeError();
    if (type === types_1.TokenInstruction.SyncNative)
        return (0, syncNative_1.decodeSyncNativeInstruction)(instruction, programId);
    // TODO: implement
    if (type === types_1.TokenInstruction.InitializeAccount3)
        throw new errors_1.TokenInvalidInstructionTypeError();
    // TODO: implement
    if (type === types_1.TokenInstruction.InitializeMultisig2)
        throw new errors_1.TokenInvalidInstructionTypeError();
    // TODO: implement
    if (type === types_1.TokenInstruction.InitializeMint2)
        throw new errors_1.TokenInvalidInstructionTypeError();
    throw new errors_1.TokenInvalidInstructionTypeError();
}
exports.decodeInstruction = decodeInstruction;
/** TODO: docs */
function isInitializeMintInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.InitializeMint;
}
exports.isInitializeMintInstruction = isInitializeMintInstruction;
/** TODO: docs */
function isInitializeAccountInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.InitializeAccount;
}
exports.isInitializeAccountInstruction = isInitializeAccountInstruction;
/** TODO: docs */
function isInitializeMultisigInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.InitializeMultisig;
}
exports.isInitializeMultisigInstruction = isInitializeMultisigInstruction;
/** TODO: docs */
function isTransferInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.Transfer;
}
exports.isTransferInstruction = isTransferInstruction;
/** TODO: docs */
function isApproveInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.Approve;
}
exports.isApproveInstruction = isApproveInstruction;
/** TODO: docs */
function isRevokeInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.Revoke;
}
exports.isRevokeInstruction = isRevokeInstruction;
/** TODO: docs */
function isSetAuthorityInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.SetAuthority;
}
exports.isSetAuthorityInstruction = isSetAuthorityInstruction;
/** TODO: docs */
function isMintToInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.MintTo;
}
exports.isMintToInstruction = isMintToInstruction;
/** TODO: docs */
function isBurnInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.Burn;
}
exports.isBurnInstruction = isBurnInstruction;
/** TODO: docs */
function isCloseAccountInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.CloseAccount;
}
exports.isCloseAccountInstruction = isCloseAccountInstruction;
/** TODO: docs */
function isFreezeAccountInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.FreezeAccount;
}
exports.isFreezeAccountInstruction = isFreezeAccountInstruction;
/** TODO: docs */
function isThawAccountInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.ThawAccount;
}
exports.isThawAccountInstruction = isThawAccountInstruction;
/** TODO: docs */
function isTransferCheckedInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.TransferChecked;
}
exports.isTransferCheckedInstruction = isTransferCheckedInstruction;
/** TODO: docs */
function isApproveCheckedInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.ApproveChecked;
}
exports.isApproveCheckedInstruction = isApproveCheckedInstruction;
/** TODO: docs */
function isMintToCheckedInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.MintToChecked;
}
exports.isMintToCheckedInstruction = isMintToCheckedInstruction;
/** TODO: docs */
function isBurnCheckedInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.BurnChecked;
}
exports.isBurnCheckedInstruction = isBurnCheckedInstruction;
/** TODO: docs, implement */
// export function isInitializeAccount2Instruction(
//     decoded: DecodedInstruction
// ): decoded is DecodedInitializeAccount2Instruction {
//     return decoded.data.instruction === TokenInstruction.InitializeAccount2;
// }
/** TODO: docs */
function isSyncNativeInstruction(decoded) {
    return decoded.data.instruction === types_1.TokenInstruction.SyncNative;
}
exports.isSyncNativeInstruction = isSyncNativeInstruction;
/** TODO: docs, implement */
// export function isInitializeAccount3Instruction(
//     decoded: DecodedInstruction
// ): decoded is DecodedInitializeAccount3Instruction {
//     return decoded.data.instruction === TokenInstruction.InitializeAccount3;
// }
/** TODO: docs, implement */
// export function isInitializeMultisig2Instruction(
//     decoded: DecodedInstruction
// ): decoded is DecodedInitializeMultisig2Instruction {
//     return decoded.data.instruction === TokenInstruction.InitializeMultisig2;
// }
/** TODO: docs, implement */
// export function isInitializeMint2Instruction(
//     decoded: DecodedInstruction
// ): decoded is DecodedInitializeMint2Instruction {
//     return decoded.data.instruction === TokenInstruction.InitializeMint2;
// }
//# sourceMappingURL=decode.js.map