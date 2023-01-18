"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeMintToInstructionUnchecked = exports.decodeMintToInstruction = exports.createMintToInstruction = exports.mintToInstructionData = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const buffer_layout_utils_1 = require("@solana/buffer-layout-utils");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const internal_1 = require("./internal");
const types_1 = require("./types");
/** TODO: docs */
exports.mintToInstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)('instruction'), (0, buffer_layout_utils_1.u64)('amount')]);
/**
 * Construct a MintTo instruction
 *
 * @param mint         Public key of the mint
 * @param destination  Address of the token account to mint to
 * @param authority    The mint authority
 * @param amount       Amount to mint
 * @param multiSigners Signing accounts if `authority` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
function createMintToInstruction(mint, destination, authority, amount, multiSigners = [], programId = constants_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_1.addSigners)([
        { pubkey: mint, isSigner: false, isWritable: true },
        { pubkey: destination, isSigner: false, isWritable: true },
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.mintToInstructionData.span);
    exports.mintToInstructionData.encode({
        instruction: types_1.TokenInstruction.MintTo,
        amount: BigInt(amount),
    }, data);
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createMintToInstruction = createMintToInstruction;
/**
 * Decode a MintTo instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
function decodeMintToInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId))
        throw new errors_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.mintToInstructionData.span)
        throw new errors_1.TokenInvalidInstructionDataError();
    const { keys: { mint, destination, authority, multiSigners }, data, } = decodeMintToInstructionUnchecked(instruction);
    if (data.instruction !== types_1.TokenInstruction.MintTo)
        throw new errors_1.TokenInvalidInstructionTypeError();
    if (!mint || !destination || !authority)
        throw new errors_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            multiSigners,
        },
        data,
    };
}
exports.decodeMintToInstruction = decodeMintToInstruction;
/**
 * Decode a MintTo instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
function decodeMintToInstructionUnchecked({ programId, keys: [mint, destination, authority, ...multiSigners], data, }) {
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            multiSigners,
        },
        data: exports.mintToInstructionData.decode(data),
    };
}
exports.decodeMintToInstructionUnchecked = decodeMintToInstructionUnchecked;
//# sourceMappingURL=mintTo.js.map