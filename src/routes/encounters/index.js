const pkg = {};
const Joi = require('joi');

export function register (server, options, next) {

  const dispatch = (cmd) => {
    return new Promise((resolve, reject) => {
      server.app.dispatcher.dispatch(cmd)
        .subscribe((response) => {
          resolve(response);
        });
      });
  };

  server.route([{
    method: 'GET',
    path: '/encounters',
    config: {
      auth: 'jwt',
      tags: ['api'],      
      handler: (request, reply) => {
        reply(dispatch({ type: 'getAllEncounters', authToken: request.auth.token }));
      }
    }
  },{
    method: 'GET',
    path: '/encounters/{id}',
    config: {
      auth: 'jwt',
      tags: ['api'],
      handler: (request, reply) => {
        reply(dispatch({ type: 'getOneEncounter', id: request.params.id }));
      } 
    }
  },{
    method: 'DELETE',
    path: '/encounters/{id}',
    config: {
      auth: 'jwt',
      tags: ['api'],
      handler: (request, reply) => {
        reply(dispatch({ type: 'removeEncounter', id: request.params.id }));
      },
      validate: {
          params: {
              id : Joi.number()
                      .required()
                      .description('the id for the encounter'),
          }
      }
    }
  },{
    method: 'POST',
    path: '/encounters',
    config: {
      auth: 'jwt',
      tags: ['api'],
      handler: (request, reply) => {
        reply(dispatch({ type: 'createEncounter', name: 'purple-urple', size: 'ginormous' }));
      }
    }
  },{
    method: 'PUT',
    path: '/encounters/{id}',
    config: {
      auth: 'jwt',
      tags: ['api'],
      handler: (request, reply) => {
        reply(dispatch({ type: 'modifyEncounter', id: request.params.id, size: 'smallish' }));
      },
      validate: {
          params: {
              id : Joi.number()
                      .required()
                      .description('the id for the encounter'),
          }
      }
    }
  }]);

  next();
};

exports.register.attributes = require('./package.json');