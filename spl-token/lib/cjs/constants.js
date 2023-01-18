"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NATIVE_MINT = exports.ASSOCIATED_TOKEN_PROGRAM_ID = exports.TOKEN_PROGRAM_ID = void 0;
const web3_js_1 = require("@solana/web3.js");
/** Address of the SPL Token program */
exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
/** Address of the SPL Associated Token Account program */
exports.ASSOCIATED_TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
/** Address of the special mint for wrapped native SOL */
exports.NATIVE_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
//# sourceMappingURL=constants.js.map