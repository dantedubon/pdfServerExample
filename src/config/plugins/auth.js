/* eslint-disable no-unused-vars, global-require */
// const hapiAuthJwt = require('hapi-auth-jwt2');
import hapiAuthJwt from 'hapi-auth-jwt2';

exports.default = {
  register: async (server: Object, options: Object) => {
    const validate = async (decoded, request) => {
      // This validate function is meant to add any layers of security
      // we think are necessary. In most cases, no additional checks are
      // necessary since the IDP has already verified the identity and
      // credentials of the user.
      if (decoded) {
        return { isValid: true };
      }
      return { isValid: false };
    };

    await server.register(hapiAuthJwt);
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.AUTH_SHARED_KEY || 'NeverShareYourSecret',
      validate,
      verifyOptions: { algorithms: ['HS256'] },
    });
    server.auth.default('jwt');
  },
  name: 'auth',
  version: '2.0.0',
  once: true,
  options: {},
};
