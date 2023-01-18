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
exports.createMint = void 0;
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const index_1 = require("../instructions/index");
const index_2 = require("../state/index");
/**
 * Create and initialize a new mint
 *
 * @param connection      Connection to use
 * @param payer           Payer of the transaction and initialization fees
 * @param mintAuthority   Account or multisig that will control minting
 * @param freezeAuthority Optional account or multisig that can freeze token accounts
 * @param decimals        Location of the decimal place
 * @param keypair         Optional keypair, defaulting to a new random one
 * @param confirmOptions  Options for confirming the transaction
 * @param programId       SPL Token program account
 *
 * @return Address of the new mint
 */
function createMint(connection, payer, mintAuthority, freezeAuthority, decimals, keypair = web3_js_1.Keypair.generate(), confirmOptions, programId = constants_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const lamports = yield (0, index_2.getMinimumBalanceForRentExemptMint)(connection);
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: index_2.MINT_SIZE,
            lamports,
            programId,
        }), (0, index_1.createInitializeMintInstruction)(keypair.publicKey, decimals, mintAuthority, freezeAuthority, programId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer, keypair], confirmOptions);
        return keypair.publicKey;
    });
}
exports.createMint = createMint;
//# sourceMappingURL=createMint.js.map