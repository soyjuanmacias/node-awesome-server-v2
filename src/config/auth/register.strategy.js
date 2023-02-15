import { Strategy } from 'passport-local';
import Logger from '../../loaders/logger.js';
import { authService } from '../../api/auth/auth.config.js';

const registerStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      return await authService.registerUser({...req.body, done});
    } catch (error) {
      Logger.error('%o', error);
      return done(error);
    }
  },
);

export default registerStrategy;
