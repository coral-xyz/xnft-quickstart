"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssociatedTokenAccountInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
/**
 * Construct an AssociatedTokenAccount instruction
 *
 * @param payer                    Payer of the initialization fees
 * @param associatedToken          New associated token account
 * @param owner                    Owner of the new account
 * @param mint                     Token mint account
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Instruction to add to a transaction
 */
function createAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, programId = constants_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    const keys = [
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: associatedToken, isSigner: false, isWritable: true },
        { pubkey: owner, isSigner: false, isWritable: false },
        { pubkey: mint, isSigner: false, isWritable: false },
        { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: programId, isSigner: false, isWritable: false },
        { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    ];
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: associatedTokenProgramId,
        data: Buffer.alloc(0),
    });
}
exports.createAssociatedTokenAccountInstruction = createAssociatedTokenAccountInstruction;
//# sourceMappingURL=associatedTokenAccount.js.map