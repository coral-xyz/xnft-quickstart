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
exports.getAssociatedTokenAddress = exports.getMinimumBalanceForRentExemptMint = exports.getMint = exports.MINT_SIZE = exports.MintLayout = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const buffer_layout_utils_1 = require("@solana/buffer-layout-utils");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
/** Buffer layout for de/serializing a mint */
exports.MintLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u32)('mintAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('mintAuthority'),
    (0, buffer_layout_utils_1.u64)('supply'),
    (0, buffer_layout_1.u8)('decimals'),
    (0, buffer_layout_utils_1.bool)('isInitialized'),
    (0, buffer_layout_1.u32)('freezeAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('freezeAuthority'),
]);
/** Byte length of a mint */
exports.MINT_SIZE = exports.MintLayout.span;
/**
 * Retrieve information about a mint
 *
 * @param connection Connection to use
 * @param address    Mint account
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Mint information
 */
function getMint(connection, address, commitment, programId = constants_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield connection.getAccountInfo(address, commitment);
        if (!info)
            throw new errors_1.TokenAccountNotFoundError();
        if (!info.owner.equals(programId))
            throw new errors_1.TokenInvalidAccountOwnerError();
        if (info.data.length != exports.MINT_SIZE)
            throw new errors_1.TokenInvalidAccountSizeError();
        const rawMint = exports.MintLayout.decode(info.data);
        return {
            address,
            mintAuthority: rawMint.mintAuthorityOption ? rawMint.mintAuthority : null,
            supply: rawMint.supply,
            decimals: rawMint.decimals,
            isInitialized: rawMint.isInitialized,
            freezeAuthority: rawMint.freezeAuthorityOption ? rawMint.freezeAuthority : null,
        };
    });
}
exports.getMint = getMint;
/** Get the minimum lamport balance for a mint to be rent exempt
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */
function getMinimumBalanceForRentExemptMint(connection, commitment) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection.getMinimumBalanceForRentExemption(exports.MINT_SIZE, commitment);
    });
}
exports.getMinimumBalanceForRentExemptMint = getMinimumBalanceForRentExemptMint;
/**
 * Get the address of the associated token account for a given mint and owner
 *
 * @param mint                     Token mint account
 * @param owner                    Owner of the new account
 * @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Address of the associated token account
 */
function getAssociatedTokenAddress(mint, owner, allowOwnerOffCurve = false, programId = constants_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!allowOwnerOffCurve && !web3_js_1.PublicKey.isOnCurve(owner.toBuffer()))
            throw new errors_1.TokenOwnerOffCurveError();
        const [address] = yield web3_js_1.PublicKey.findProgramAddress([owner.toBuffer(), programId.toBuffer(), mint.toBuffer()], associatedTokenProgramId);
        return address;
    });
}
exports.getAssociatedTokenAddress = getAssociatedTokenAddress;
//# sourceMappingURL=mint.js.map