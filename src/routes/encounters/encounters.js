/* eslint-disable no-unused-vars */
import Joi from 'joi';
import { EncounterModel } from '../../domain/validators/encounter.schema';

import type { Command } from '../../domain/types/encounter';

const headersValidation = Joi.object({
  authorization: Joi.string(),
}).options({ allowUnknown: true });

const register = async (server: Object, options: Object) => {
  const dispatch = (cmd: Command) =>
    new Promise((resolve) => {
      server.app.dispatcher.dispatch(cmd).subscribe((response) => {
        resolve(response);
      });
    });
  server.route([
    {
      method: 'GET',
      path: '/encounters',
      config: {
        auth: false,
        tags: ['api'],
        handler: (request, reply) => {
          reply(dispatch({
            type: 'getAllEncounters',
            userId: request.auth.credentials.id,
          }));
        },
        validate: {
          headers: headersValidation,
        },
      },
    },
    {
      method: 'GET',
      path: '/encounters/{id}',
      config: {
        auth: false,
        tags: ['api'],
        handler: (request, reply) => {
          reply(dispatch({ type: 'getOneEncounter', id: request.params.id }));
        },
        validate: {
          headers: headersValidation,
          params: {
            id: Joi.number()
              .required()
              .description('the id for the encounter'),
          },
        },
      },
    },
    {
      method: 'DELETE',
      path: '/encounters/{id}',
      config: {
        auth: false,
        tags: ['api'],
        handler: (request, reply) => {
          reply(dispatch({ type: 'removeEncounter', id: request.params.id }));
        },
        validate: {
          headers: headersValidation,
          params: {
            id: Joi.number()
              .required()
              .description('the id for the encounter'),
          },
        },
      },
    },
    {
      method: 'POST',
      path: '/encounters',
      config: {
        auth: false,
        tags: ['api'],
        handler: (request, reply) => {
          reply(dispatch({
            type: 'createEncounter',
            name: 'purple-urple',
            age: 25,
            bloodType: 'B+',
          }));
        },
        validate: {
          headers: headersValidation,
          payload: EncounterModel,
        },
      },
    },
    {
      method: 'PUT',
      path: '/encounters/{id}',
      config: {
        auth: false,
        tags: ['api'],
        handler: (request, reply) => {
          reply(dispatch({
            type: 'modifyEncounter',
            id: request.params.id,
            modify: { name: 'cambióaaaaaaa', age: 40 },
          }));
        },
        validate: {
          headers: headersValidation,
          payload: EncounterModel,
          params: {
            id: Joi.number()
              .required()
              .description('the id for the encounter'),
          },
        },
      },
    },
  ]);
};

export default register;
