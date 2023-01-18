"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeRevokeInstructionUnchecked = exports.decodeRevokeInstruction = exports.createRevokeInstruction = exports.revokeInstructionData = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const internal_1 = require("./internal");
const types_1 = require("./types");
/** TODO: docs */
exports.revokeInstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)('instruction')]);
/**
 * Construct a Revoke instruction
 *
 * @param account      Address of the token account
 * @param owner        Owner of the account
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
function createRevokeInstruction(account, owner, multiSigners = [], programId = constants_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_1.addSigners)([{ pubkey: account, isSigner: false, isWritable: true }], owner, multiSigners);
    const data = Buffer.alloc(exports.revokeInstructionData.span);
    exports.revokeInstructionData.encode({ instruction: types_1.TokenInstruction.Revoke }, data);
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createRevokeInstruction = createRevokeInstruction;
/**
 * Decode a Revoke instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
function decodeRevokeInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId))
        throw new errors_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.revokeInstructionData.span)
        throw new errors_1.TokenInvalidInstructionDataError();
    const { keys: { account, owner, multiSigners }, data, } = decodeRevokeInstructionUnchecked(instruction);
    if (data.instruction !== types_1.TokenInstruction.Revoke)
        throw new errors_1.TokenInvalidInstructionTypeError();
    if (!account || !owner)
        throw new errors_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            owner,
            multiSigners,
        },
        data,
    };
}
exports.decodeRevokeInstruction = decodeRevokeInstruction;
/**
 * Decode a Revoke instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
function decodeRevokeInstructionUnchecked({ programId, keys: [account, owner, ...multiSigners], data, }) {
    return {
        programId,
        keys: {
            account,
            owner,
            multiSigners,
        },
        data: exports.revokeInstructionData.decode(data),
    };
}
exports.decodeRevokeInstructionUnchecked = decodeRevokeInstructionUnchecked;
//# sourceMappingURL=revoke.js.map