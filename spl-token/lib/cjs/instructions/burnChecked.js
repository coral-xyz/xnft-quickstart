"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBurnCheckedInstructionUnchecked = exports.decodeBurnCheckedInstruction = exports.createBurnCheckedInstruction = exports.burnCheckedInstructionData = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const buffer_layout_utils_1 = require("@solana/buffer-layout-utils");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const internal_1 = require("./internal");
const types_1 = require("./types");
/** TODO: docs */
exports.burnCheckedInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u8)('decimals'),
]);
/**
 * Construct a BurnChecked instruction
 *
 * @param mint         Mint for the account
 * @param account      Account to burn tokens from
 * @param owner        Owner of the account
 * @param amount       Number of tokens to burn
 * @param decimals     Number of decimals in burn amount
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
function createBurnCheckedInstruction(account, mint, owner, amount, decimals, multiSigners = [], programId = constants_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_1.addSigners)([
        { pubkey: account, isSigner: false, isWritable: true },
        { pubkey: mint, isSigner: false, isWritable: true },
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.burnCheckedInstructionData.span);
    exports.burnCheckedInstructionData.encode({
        instruction: types_1.TokenInstruction.BurnChecked,
        amount: BigInt(amount),
        decimals,
    }, data);
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createBurnCheckedInstruction = createBurnCheckedInstruction;
/**
 * Decode a BurnChecked instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
function decodeBurnCheckedInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId))
        throw new errors_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.burnCheckedInstructionData.span)
        throw new errors_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint, owner, multiSigners }, data, } = decodeBurnCheckedInstructionUnchecked(instruction);
    if (data.instruction !== types_1.TokenInstruction.BurnChecked)
        throw new errors_1.TokenInvalidInstructionTypeError();
    if (!account || !mint || !owner)
        throw new errors_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            multiSigners,
        },
        data,
    };
}
exports.decodeBurnCheckedInstruction = decodeBurnCheckedInstruction;
/**
 * Decode a BurnChecked instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
function decodeBurnCheckedInstructionUnchecked({ programId, keys: [account, mint, owner, ...multiSigners], data, }) {
    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            multiSigners,
        },
        data: exports.burnCheckedInstructionData.decode(data),
    };
}
exports.decodeBurnCheckedInstructionUnchecked = decodeBurnCheckedInstructionUnchecked;
//# sourceMappingURL=burnChecked.js.map