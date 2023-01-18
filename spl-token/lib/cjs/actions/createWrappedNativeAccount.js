"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWrappedNativeAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const index_1 = require("../instructions/index");
const index_2 = require("../state/index");
const createAccount_1 = require("./createAccount");
/**
 * Create, initialize, and fund a new wrapped native SOL account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction and initialization fees
 * @param owner          Owner of the new token account
 * @param amount         Number of lamports to wrap
 * @param keypair        Optional keypair, defaulting to the associated token account for the native mint and `owner`
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Address of the new wrapped native SOL account
 */
function createWrappedNativeAccount(connection, payer, owner, amount, keypair, confirmOptions, programId = constants_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        // If the amount provided is explicitly 0 or NaN, just create the account without funding it
        if (!amount)
            return yield (0, createAccount_1.createAccount)(connection, payer, constants_1.NATIVE_MINT, owner, keypair, confirmOptions, programId);
        // If a keypair isn't provided, create the account at the owner's ATA for the native mint and return its address
        if (!keypair) {
            const associatedToken = yield (0, index_2.getAssociatedTokenAddress)(constants_1.NATIVE_MINT, owner, false, programId, constants_1.ASSOCIATED_TOKEN_PROGRAM_ID);
            const transaction = new web3_js_1.Transaction().add((0, index_1.createAssociatedTokenAccountInstruction)(payer.publicKey, associatedToken, owner, constants_1.NATIVE_MINT, programId, constants_1.ASSOCIATED_TOKEN_PROGRAM_ID), web3_js_1.SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: associatedToken,
                lamports: amount,
            }), (0, index_1.createSyncNativeInstruction)(associatedToken, programId));
            yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer], confirmOptions);
            return associatedToken;
        }
        // Otherwise, create the account with the provided keypair and return its public key
        const lamports = yield (0, index_2.getMinimumBalanceForRentExemptAccount)(connection);
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: index_2.ACCOUNT_SIZE,
            lamports,
            programId,
        }), web3_js_1.SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: keypair.publicKey,
            lamports: amount,
        }), (0, index_1.createInitializeAccountInstruction)(keypair.publicKey, constants_1.NATIVE_MINT, owner, programId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer, keypair], confirmOptions);
        return keypair.publicKey;
    });
}
exports.createWrappedNativeAccount = createWrappedNativeAccount;
//# sourceMappingURL=createWrappedNativeAccount.js.map