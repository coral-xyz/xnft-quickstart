"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeCloseAccountInstructionUnchecked = exports.decodeCloseAccountInstruction = exports.createCloseAccountInstruction = exports.closeAccountInstructionData = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const internal_1 = require("./internal");
const types_1 = require("./types");
/** TODO: docs */
exports.closeAccountInstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)('instruction')]);
/**
 * Construct a CloseAccount instruction
 *
 * @param account      Account to close
 * @param destination  Account to receive the remaining balance of the closed account
 * @param authority    Account close authority
 * @param multiSigners Signing accounts if `authority` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
function createCloseAccountInstruction(account, destination, authority, multiSigners = [], programId = constants_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_1.addSigners)([
        { pubkey: account, isSigner: false, isWritable: true },
        { pubkey: destination, isSigner: false, isWritable: true },
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.closeAccountInstructionData.span);
    exports.closeAccountInstructionData.encode({ instruction: types_1.TokenInstruction.CloseAccount }, data);
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createCloseAccountInstruction = createCloseAccountInstruction;
/**
 * Decode a CloseAccount instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
function decodeCloseAccountInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId))
        throw new errors_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.closeAccountInstructionData.span)
        throw new errors_1.TokenInvalidInstructionDataError();
    const { keys: { account, destination, authority, multiSigners }, data, } = decodeCloseAccountInstructionUnchecked(instruction);
    if (data.instruction !== types_1.TokenInstruction.CloseAccount)
        throw new errors_1.TokenInvalidInstructionTypeError();
    if (!account || !destination || !authority)
        throw new errors_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            destination,
            authority,
            multiSigners,
        },
        data,
    };
}
exports.decodeCloseAccountInstruction = decodeCloseAccountInstruction;
/**
 * Decode a CloseAccount instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
function decodeCloseAccountInstructionUnchecked({ programId, keys: [account, destination, authority, ...multiSigners], data, }) {
    return {
        programId,
        keys: {
            account,
            destination,
            authority,
            multiSigners,
        },
        data: exports.closeAccountInstructionData.decode(data),
    };
}
exports.decodeCloseAccountInstructionUnchecked = decodeCloseAccountInstructionUnchecked;
//# sourceMappingURL=closeAccount.js.map