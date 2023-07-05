"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const data_source_1 = require("./data.source");
require('dotenv').config();
const JwtStrategy = passport_jwt_1.default.Strategy;
const { ExtractJwt } = passport_jwt_1.default;
const options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
module.exports = (passport) => passport.use(new JwtStrategy(options, async (token, done) => {
    try {
        const user = await data_source_1.userRepository.findOne({ where: { email: token.email } });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (err) {
        return done(null, false);
    }
}));
//# sourceMappingURL=passport.js.map