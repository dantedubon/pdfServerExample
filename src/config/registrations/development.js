const Pack = require('../../package.json');

export default [
  {
    plugin: 'inert',
  },
  {
    plugin: 'vision',
  },
  {
    plugin: 'hapi-swagger',
    options: {
      info: {
        title: `${Pack.name} API Documentation`,
        description: `${Pack.description}`,
        // Get the version from package.json
        version: Pack.version,
        contact: {
          name: 'Acklen Avenue',
          url: 'https://acklenavenue.com/',
        },
      },
      documentationPath: '/docs',
      host: 'localhost:8000',
    },
  },
  {
    plugin: 'blipp',
  },
];
