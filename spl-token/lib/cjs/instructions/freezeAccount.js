"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeFreezeAccountInstructionUnchecked = exports.decodeFreezeAccountInstruction = exports.createFreezeAccountInstruction = exports.freezeAccountInstructionData = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const internal_1 = require("./internal");
const types_1 = require("./types");
/** TODO: docs */
exports.freezeAccountInstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)('instruction')]);
/**
 * Construct a FreezeAccount instruction
 *
 * @param account      Account to freeze
 * @param mint         Mint account
 * @param authority    Mint freeze authority
 * @param multiSigners Signing accounts if `authority` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
function createFreezeAccountInstruction(account, mint, authority, multiSigners = [], programId = constants_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_1.addSigners)([
        { pubkey: account, isSigner: false, isWritable: true },
        { pubkey: mint, isSigner: false, isWritable: false },
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.freezeAccountInstructionData.span);
    exports.freezeAccountInstructionData.encode({ instruction: types_1.TokenInstruction.FreezeAccount }, data);
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createFreezeAccountInstruction = createFreezeAccountInstruction;
/**
 * Decode a FreezeAccount instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
function decodeFreezeAccountInstruction(instruction, programId = constants_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId))
        throw new errors_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.freezeAccountInstructionData.span)
        throw new errors_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint, authority, multiSigners }, data, } = decodeFreezeAccountInstructionUnchecked(instruction);
    if (data.instruction !== types_1.TokenInstruction.FreezeAccount)
        throw new errors_1.TokenInvalidInstructionTypeError();
    if (!account || !mint || !authority)
        throw new errors_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint,
            authority,
            multiSigners,
        },
        data,
    };
}
exports.decodeFreezeAccountInstruction = decodeFreezeAccountInstruction;
/**
 * Decode a FreezeAccount instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
function decodeFreezeAccountInstructionUnchecked({ programId, keys: [account, mint, authority, ...multiSigners], data, }) {
    return {
        programId,
        keys: {
            account,
            mint,
            authority,
            multiSigners,
        },
        data: exports.freezeAccountInstructionData.decode(data),
    };
}
exports.decodeFreezeAccountInstructionUnchecked = decodeFreezeAccountInstructionUnchecked;
//# sourceMappingURL=freezeAccount.js.map