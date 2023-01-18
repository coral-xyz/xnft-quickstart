"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeMintToCheckedInstructionUnchecked = exports.decodeMintToCheckedInstruction = exports.createMintToCheckedInstruction = exports.mintToCheckedInstructionData = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const buffer_layout_utils_1 = require("@solana/buffer-layout-utils");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const internal_1 = require("./internal");
const types_1 = require("./types");
/** TODO: docs */
exports.mintToCheckedInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u8)('decimals'),
]);
/**
 * Construct a MintToChecked instruction
 *
 * @param mint         Public key of the mint
 * @param destination  Address of the token account to mint to
 * @param authority    The mint authority
 * @param amount       Amount to mint
 * @param decimals     Number of decimals in amount to mint
 * @param multiSigners Signing accounts if `authority` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
function createMintToCheckedInstruction(mint, destination, authority, amount, decimals, multiSigners = [], programId = constants_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_1.addSigners)([
        { pubkey: mint, isSigner: false, isWritable: true },
        { pubkey: destination, isSigner: false, isWritable: true },
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.mintToCheckedInstructionData.span);
    exports.mintToCheckedInstructionData.encode({
        instruction: types_1.TokenInstruction.MintToChecked,
        amount: BigInt(amount),
        decimals,
    }, data);
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createMintToCheckedInstruction = createMintToCheckedInstruction;
/**
 * Decode a MintToChecked instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
function decodeMintToCheckedInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId))
        throw new errors_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.mintToCheckedInstructionData.span)
        throw new errors_1.TokenInvalidInstructionDataError();
    const { keys: { mint, destination, authority, multiSigners }, data, } = decodeMintToCheckedInstructionUnchecked(instruction);
    if (data.instruction !== types_1.TokenInstruction.MintToChecked)
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
exports.decodeMintToCheckedInstruction = decodeMintToCheckedInstruction;
/**
 * Decode a MintToChecked instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
function decodeMintToCheckedInstructionUnchecked({ programId, keys: [mint, destination, authority, ...multiSigners], data, }) {
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            multiSigners,
        },
        data: exports.mintToCheckedInstructionData.decode(data),
    };
}
exports.decodeMintToCheckedInstructionUnchecked = decodeMintToCheckedInstructionUnchecked;
//# sourceMappingURL=mintToChecked.js.map