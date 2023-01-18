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
exports.createAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const index_1 = require("../instructions/index");
const index_2 = require("../state/index");
const createAssociatedTokenAccount_1 = require("./createAssociatedTokenAccount");
/**
 * Create and initialize a new token account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction and initialization fees
 * @param mint           Mint for the account
 * @param owner          Owner of the new account
 * @param keypair        Optional keypair, defaulting to the associated token account for the `mint` and `owner`
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Address of the new token account
 */
function createAccount(connection, payer, mint, owner, keypair, confirmOptions, programId = constants_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        // If a keypair isn't provided, create the associated token account and return its address
        if (!keypair)
            return yield (0, createAssociatedTokenAccount_1.createAssociatedTokenAccount)(connection, payer, mint, owner, confirmOptions, programId);
        // Otherwise, create the account with the provided keypair and return its public key
        const lamports = yield (0, index_2.getMinimumBalanceForRentExemptAccount)(connection);
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: index_2.ACCOUNT_SIZE,
            lamports,
            programId,
        }), (0, index_1.createInitializeAccountInstruction)(keypair.publicKey, mint, owner, programId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer, keypair], confirmOptions);
        return keypair.publicKey;
    });
}
exports.createAccount = createAccount;
//# sourceMappingURL=createAccount.js.map