/* eslint-disable no-unused-vars, global-require */
// const hapiAuthJwt = require('hapi-auth-jwt2');

const plugin = {
  register: async (server: Object, options: Object) => {
    const validate = async (decoded, request) => {
      // This validate function is meant to add any layers of security
      // we think are necessary. In most cases, no additional checks are
      // necessary since the IDP has already verified the identity and
      // credentials of the user.
      if (decoded && decoded.sub) {
        return { isValid: true };
      }
      return { isValid: false };
    };

    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt', true, {
      key: process.env.AUTH_SHARED_KEY || 'NeverShareYourSecret',
      validate,
      verifyOptions: { algorithms: ['HS256'] },
    });
    server.auth.default('jwt');
  },
  name: 'auth',
  version: '1.0.0',
  once: true,
  options: {},
};
export default plugin;

// // $FlowFixMe
// export function register(server: Object, options: Object) {
//   // $FlowFixMe
//   console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Mierda');
//   console.log(server);
//   const validate = async (decoded, request) => {
//     // This validate function is meant to add any layers of security
//     // we think are necessary. In most cases, no additional checks are
//     // necessary since the IDP has already verified the identity and
//     // credentials of the user.
//     if (decoded && decoded.sub) {
//       return { isValid: true };
//     }
//     return { isValid: false };
//   };
//   // $FlowFixMe
//   const init = async () => {
//     await server.register(hapiAuthJwt);

//     server.auth.strategy('jwt', 'jwt', true, {
//       key: process.env.AUTH_SHARED_KEY || 'NeverShareYourSecret',
//       validate,
//       verifyOptions: { algorithms: ['HS256'] },
//     });

//     server.auth.default('jwt');
//   };
//   init()
//     .then(() => next())
//     .catch((error) => console.log(error));
// }

// exports.register.attributes = { name: 'auth', version: '1.0.0' };
