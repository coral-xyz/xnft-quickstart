"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTransferCheckedInstructionUnchecked = exports.decodeTransferCheckedInstruction = exports.createTransferCheckedInstruction = exports.transferCheckedInstructionData = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const buffer_layout_utils_1 = require("@solana/buffer-layout-utils");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const internal_1 = require("./internal");
const types_1 = require("./types");
/** TODO: docs */
exports.transferCheckedInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u8)('decimals'),
]);
/**
 * Construct a TransferChecked instruction
 *
 * @param source       Source account
 * @param mint         Mint account
 * @param destination  Destination account
 * @param owner        Owner of the source account
 * @param amount       Number of tokens to transfer
 * @param decimals     Number of decimals in transfer amount
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
function createTransferCheckedInstruction(source, mint, destination, owner, amount, decimals, multiSigners = [], programId = constants_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_1.addSigners)([
        { pubkey: source, isSigner: false, isWritable: true },
        { pubkey: mint, isSigner: false, isWritable: false },
        { pubkey: destination, isSigner: false, isWritable: true },
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.transferCheckedInstructionData.span);
    exports.transferCheckedInstructionData.encode({
        instruction: types_1.TokenInstruction.TransferChecked,
        amount: BigInt(amount),
        decimals,
    }, data);
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createTransferCheckedInstruction = createTransferCheckedInstruction;
/**
 * Decode a TransferChecked instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
function decodeTransferCheckedInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId))
        throw new errors_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.transferCheckedInstructionData.span)
        throw new errors_1.TokenInvalidInstructionDataError();
    const { keys: { source, mint, destination, owner, multiSigners }, data, } = decodeTransferCheckedInstructionUnchecked(instruction);
    if (data.instruction !== types_1.TokenInstruction.TransferChecked)
        throw new errors_1.TokenInvalidInstructionTypeError();
    if (!source || !mint || !destination || !owner)
        throw new errors_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            source,
            mint,
            destination,
            owner,
            multiSigners,
        },
        data,
    };
}
exports.decodeTransferCheckedInstruction = decodeTransferCheckedInstruction;
/**
 * Decode a TransferChecked instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
function decodeTransferCheckedInstructionUnchecked({ programId, keys: [source, mint, destination, owner, ...multiSigners], data, }) {
    return {
        programId,
        keys: {
            source,
            mint,
            destination,
            owner,
            multiSigners,
        },
        data: exports.transferCheckedInstructionData.decode(data),
    };
}
exports.decodeTransferCheckedInstructionUnchecked = decodeTransferCheckedInstructionUnchecked;
//# sourceMappingURL=transferChecked.js.map