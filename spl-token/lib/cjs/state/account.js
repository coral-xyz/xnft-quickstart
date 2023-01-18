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
exports.getMinimumBalanceForRentExemptAccount = exports.getAccount = exports.ACCOUNT_SIZE = exports.AccountLayout = exports.AccountState = void 0;
const buffer_layout_1 = require("@solana/buffer-layout");
const buffer_layout_utils_1 = require("@solana/buffer-layout-utils");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
/** Token account state as stored by the program */
var AccountState;
(function (AccountState) {
    AccountState[AccountState["Uninitialized"] = 0] = "Uninitialized";
    AccountState[AccountState["Initialized"] = 1] = "Initialized";
    AccountState[AccountState["Frozen"] = 2] = "Frozen";
})(AccountState = exports.AccountState || (exports.AccountState = {}));
/** Buffer layout for de/serializing a token account */
exports.AccountLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.publicKey)('mint'),
    (0, buffer_layout_utils_1.publicKey)('owner'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u32)('delegateOption'),
    (0, buffer_layout_utils_1.publicKey)('delegate'),
    (0, buffer_layout_1.u8)('state'),
    (0, buffer_layout_1.u32)('isNativeOption'),
    (0, buffer_layout_utils_1.u64)('isNative'),
    (0, buffer_layout_utils_1.u64)('delegatedAmount'),
    (0, buffer_layout_1.u32)('closeAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('closeAuthority'),
]);
/** Byte length of a token account */
exports.ACCOUNT_SIZE = exports.AccountLayout.span;
/**
 * Retrieve information about a token account
 *
 * @param connection Connection to use
 * @param address    Token account
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Token account information
 */
function getAccount(connection, address, commitment, programId = constants_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield connection.getAccountInfo(address, commitment);
        if (!info)
            throw new errors_1.TokenAccountNotFoundError();
        if (!info.owner.equals(programId))
            throw new errors_1.TokenInvalidAccountOwnerError();
        if (info.data.length != exports.ACCOUNT_SIZE)
            throw new errors_1.TokenInvalidAccountSizeError();
        const rawAccount = exports.AccountLayout.decode(info.data);
        return {
            address,
            mint: rawAccount.mint,
            owner: rawAccount.owner,
            amount: rawAccount.amount,
            delegate: rawAccount.delegateOption ? rawAccount.delegate : null,
            delegatedAmount: rawAccount.delegatedAmount,
            isInitialized: rawAccount.state !== AccountState.Uninitialized,
            isFrozen: rawAccount.state === AccountState.Frozen,
            isNative: !!rawAccount.isNativeOption,
            rentExemptReserve: rawAccount.isNativeOption ? rawAccount.isNative : null,
            closeAuthority: rawAccount.closeAuthorityOption ? rawAccount.closeAuthority : null,
        };
    });
}
exports.getAccount = getAccount;
/** Get the minimum lamport balance for a token account to be rent exempt
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */
function getMinimumBalanceForRentExemptAccount(connection, commitment) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection.getMinimumBalanceForRentExemption(exports.ACCOUNT_SIZE, commitment);
    });
}
exports.getMinimumBalanceForRentExemptAccount = getMinimumBalanceForRentExemptAccount;
//# sourceMappingURL=account.js.map