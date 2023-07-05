"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const passport_1 = __importDefault(require("passport"));
function authenticate(req, res, next) {
    return passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err instanceof Error) {
            res.status(401).json({ error: 'Authentification failed' });
            return;
        }
        req.body.user = user;
        next();
    })(req, res, next);
}
exports.authenticate = authenticate;
//# sourceMappingURL=authPassport.js.map