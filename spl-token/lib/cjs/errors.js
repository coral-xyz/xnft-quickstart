"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenInvalidInstructionTypeError = exports.TokenInvalidInstructionDataError = exports.TokenInvalidInstructionKeysError = exports.TokenInvalidInstructionProgramError = exports.TokenOwnerOffCurveError = exports.TokenInvalidOwnerError = exports.TokenInvalidMintError = exports.TokenInvalidAccountSizeError = exports.TokenInvalidAccountOwnerError = exports.TokenAccountNotFoundError = exports.TokenError = void 0;
/** Base class for errors */
class TokenError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.TokenError = TokenError;
/** Thrown if an account is not found at the expected address */
class TokenAccountNotFoundError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenAccountNotFoundError';
    }
}
exports.TokenAccountNotFoundError = TokenAccountNotFoundError;
/** Thrown if a program state account is not owned by the expected token program */
class TokenInvalidAccountOwnerError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenInvalidAccountOwnerError';
    }
}
exports.TokenInvalidAccountOwnerError = TokenInvalidAccountOwnerError;
/** Thrown if the byte length of an program state account doesn't match the expected size */
class TokenInvalidAccountSizeError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenInvalidAccountSizeError';
    }
}
exports.TokenInvalidAccountSizeError = TokenInvalidAccountSizeError;
/** Thrown if the mint of a token account doesn't match the expected mint */
class TokenInvalidMintError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenInvalidMintError';
    }
}
exports.TokenInvalidMintError = TokenInvalidMintError;
/** Thrown if the owner of a token account doesn't match the expected owner */
class TokenInvalidOwnerError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenInvalidOwnerError';
    }
}
exports.TokenInvalidOwnerError = TokenInvalidOwnerError;
/** Thrown if the owner of a token account is a PDA (Program Derived Address) */
class TokenOwnerOffCurveError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenOwnerOffCurveError';
    }
}
exports.TokenOwnerOffCurveError = TokenOwnerOffCurveError;
/** Thrown if an instruction's program is invalid */
class TokenInvalidInstructionProgramError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenInvalidInstructionProgramError';
    }
}
exports.TokenInvalidInstructionProgramError = TokenInvalidInstructionProgramError;
/** Thrown if an instruction's keys are invalid */
class TokenInvalidInstructionKeysError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenInvalidInstructionKeysError';
    }
}
exports.TokenInvalidInstructionKeysError = TokenInvalidInstructionKeysError;
/** Thrown if an instruction's data is invalid */
class TokenInvalidInstructionDataError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenInvalidInstructionDataError';
    }
}
exports.TokenInvalidInstructionDataError = TokenInvalidInstructionDataError;
/** Thrown if an instruction's type is invalid */
class TokenInvalidInstructionTypeError extends TokenError {
    constructor() {
        super(...arguments);
        this.name = 'TokenInvalidInstructionTypeError';
    }
}
exports.TokenInvalidInstructionTypeError = TokenInvalidInstructionTypeError;
//# sourceMappingURL=errors.js.map