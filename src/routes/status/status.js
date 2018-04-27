/* eslint-disable no-unused-vars */
const pkg = require('./package.json');

const register = async (server: Object, options: Object) => {
  server.route([
    {
      method: 'GET',
      path: '/status',
      handler: (request, h) => h.response(pkg),
      options: {
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        h.notAvailable();
      },
      options: {
        auth: false,
      },
    },
  ]);
};

export default register;
