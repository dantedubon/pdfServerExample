/* eslint-disable no-unused-vars */
const pkg = require('./package.json');

const register = async (server: Object, options: Object) => {
  server.route({
    method: 'GET',
    path: '/status',
    config: {
      auth: false,
      tags: ['api'],
      handler: (request, reply) => {
        reply(pkg);
      },
    },
  });
};

export default register;
