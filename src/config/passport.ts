import JWT from 'passport-jwt';
import { PassportStatic } from 'passport';
import { userRepository } from './data.source';

require('dotenv').config();

const JwtStrategy = JWT.Strategy;
const { ExtractJwt } = JWT;
const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
module.exports = (passport: PassportStatic) =>
  passport.use(
    new JwtStrategy(options, async (token, done) => {
      try {
        const user = await userRepository.findOne({ where: { email: token.email } });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(null, false);
      }
    })
  );
