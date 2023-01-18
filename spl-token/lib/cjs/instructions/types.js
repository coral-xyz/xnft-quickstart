"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenInstruction = void 0;
/** Instructions defined by the program */
var TokenInstruction;
(function (TokenInstruction) {
    TokenInstruction[TokenInstruction["InitializeMint"] = 0] = "InitializeMint";
    TokenInstruction[TokenInstruction["InitializeAccount"] = 1] = "InitializeAccount";
    TokenInstruction[TokenInstruction["InitializeMultisig"] = 2] = "InitializeMultisig";
    TokenInstruction[TokenInstruction["Transfer"] = 3] = "Transfer";
    TokenInstruction[TokenInstruction["Approve"] = 4] = "Approve";
    TokenInstruction[TokenInstruction["Revoke"] = 5] = "Revoke";
    TokenInstruction[TokenInstruction["SetAuthority"] = 6] = "SetAuthority";
    TokenInstruction[TokenInstruction["MintTo"] = 7] = "MintTo";
    TokenInstruction[TokenInstruction["Burn"] = 8] = "Burn";
    TokenInstruction[TokenInstruction["CloseAccount"] = 9] = "CloseAccount";
    TokenInstruction[TokenInstruction["FreezeAccount"] = 10] = "FreezeAccount";
    TokenInstruction[TokenInstruction["ThawAccount"] = 11] = "ThawAccount";
    TokenInstruction[TokenInstruction["TransferChecked"] = 12] = "TransferChecked";
    TokenInstruction[TokenInstruction["ApproveChecked"] = 13] = "ApproveChecked";
    TokenInstruction[TokenInstruction["MintToChecked"] = 14] = "MintToChecked";
    TokenInstruction[TokenInstruction["BurnChecked"] = 15] = "BurnChecked";
    TokenInstruction[TokenInstruction["InitializeAccount2"] = 16] = "InitializeAccount2";
    TokenInstruction[TokenInstruction["SyncNative"] = 17] = "SyncNative";
    TokenInstruction[TokenInstruction["InitializeAccount3"] = 18] = "InitializeAccount3";
    TokenInstruction[TokenInstruction["InitializeMultisig2"] = 19] = "InitializeMultisig2";
    TokenInstruction[TokenInstruction["InitializeMint2"] = 20] = "InitializeMint2";
})(TokenInstruction = exports.TokenInstruction || (exports.TokenInstruction = {}));
//# sourceMappingURL=types.js.map