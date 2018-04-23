const pkg = require('./package.json');

export function register(server: Object, options: Object, next: () => mixed) {
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
  next();
}

exports.register.attributes = pkg;
