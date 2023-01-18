"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTransferInstructionUnchecked = exports.decodeTransferInstruction = exports.createTransferInstruction = exports.transferInstructionData = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const buffer_layout_utils_1 = require("@solana/buffer-layout-utils");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const internal_1 = require("./internal");
const types_1 = require("./types");
/** TODO: docs */
exports.transferInstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)('instruction'), (0, buffer_layout_utils_1.u64)('amount')]);
/**
 * Construct a Transfer instruction
 *
 * @param source       Source account
 * @param destination  Destination account
 * @param owner        Owner of the source account
 * @param amount       Number of tokens to transfer
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
function createTransferInstruction(source, destination, owner, amount, multiSigners = [], programId = constants_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_1.addSigners)([
        { pubkey: source, isSigner: false, isWritable: true },
        { pubkey: destination, isSigner: false, isWritable: true },
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.transferInstructionData.span);
    exports.transferInstructionData.encode({
        instruction: types_1.TokenInstruction.Transfer,
        amount: BigInt(amount),
    }, data);
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createTransferInstruction = createTransferInstruction;
/**
 * Decode a Transfer instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
function decodeTransferInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId))
        throw new errors_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.transferInstructionData.span)
        throw new errors_1.TokenInvalidInstructionDataError();
    const { keys: { source, destination, owner, multiSigners }, data, } = decodeTransferInstructionUnchecked(instruction);
    if (data.instruction !== types_1.TokenInstruction.Transfer)
        throw new errors_1.TokenInvalidInstructionTypeError();
    if (!source || !destination || !owner)
        throw new errors_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            source,
            destination,
            owner,
            multiSigners,
        },
        data,
    };
}
exports.decodeTransferInstruction = decodeTransferInstruction;
/**
 * Decode a Transfer instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
function decodeTransferInstructionUnchecked({ programId, keys: [source, destination, owner, ...multiSigners], data, }) {
    return {
        programId,
        keys: {
            source,
            destination,
            owner,
            multiSigners,
        },
        data: exports.transferInstructionData.decode(data),
    };
}
exports.decodeTransferInstructionUnchecked = decodeTransferInstructionUnchecked;
//# sourceMappingURL=transfer.js.map