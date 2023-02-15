import { Strategy } from 'passport-local';
import { authService } from '../../api/auth/auth.config.js';
import Logger from '../../loaders/logger.js';

const loginStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false,
  },
  async (email, password, done) => {
    try {
      await authService.loginUser({ done, email, password });
    } catch (error) {
      Logger.error('%o', error);
      return done(error);
    }
  },
);

export default loginStrategy;
