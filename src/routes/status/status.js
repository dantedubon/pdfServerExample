/* eslint-disable no-unused-vars */
const pkg = require('./package.json');

const register = async (server: Object, options: Object) => {
  server.route({
    method: 'GET',
    path: '/status',
    handler: (request, h) => h.response(pkg),
    options: {
      tags: ['api'],
    },
  });
};

export default register;
