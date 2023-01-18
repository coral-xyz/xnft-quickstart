"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSyncNativeInstructionUnchecked = exports.decodeSyncNativeInstruction = exports.createSyncNativeInstruction = exports.syncNativeInstructionData = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const types_1 = require("./types");
/** TODO: docs */
exports.syncNativeInstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)('instruction')]);
/**
 * Construct a SyncNative instruction
 *
 * @param account   Native account to sync lamports from
 * @param programId SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
function createSyncNativeInstruction(account, programId = constants_1.TOKEN_PROGRAM_ID) {
    const keys = [{ pubkey: account, isSigner: false, isWritable: true }];
    const data = Buffer.alloc(exports.syncNativeInstructionData.span);
    exports.syncNativeInstructionData.encode({ instruction: types_1.TokenInstruction.SyncNative }, data);
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createSyncNativeInstruction = createSyncNativeInstruction;
/**
 * Decode a SyncNative instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
function decodeSyncNativeInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId))
        throw new errors_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.syncNativeInstructionData.span)
        throw new errors_1.TokenInvalidInstructionDataError();
    const { keys: { account }, data, } = decodeSyncNativeInstructionUnchecked(instruction);
    if (data.instruction !== types_1.TokenInstruction.SyncNative)
        throw new errors_1.TokenInvalidInstructionTypeError();
    if (!account)
        throw new errors_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
        },
        data,
    };
}
exports.decodeSyncNativeInstruction = decodeSyncNativeInstruction;
/**
 * Decode a SyncNative instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
function decodeSyncNativeInstructionUnchecked({ programId, keys: [account], data, }) {
    return {
        programId,
        keys: {
            account,
        },
        data: exports.syncNativeInstructionData.decode(data),
    };
}
exports.decodeSyncNativeInstructionUnchecked = decodeSyncNativeInstructionUnchecked;
//# sourceMappingURL=syncNative.js.map