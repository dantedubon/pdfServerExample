/* eslint-disable no-unused-vars */
import Joi from 'joi';
import Pack from './package.json';
import { EncounterModel } from '../../domain/validators/encounter.schema';

import type { Command } from '../../domain/types/encounter';

const headersValidation = Joi.object({
  authorization: Joi.string(),
}).options({ allowUnknown: true });

exports.default = {
  pkg: Pack,
  register: async (server: Object, options: Object) => {
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
        handler: (request, h) =>
          dispatch({
            type: 'getAllEncounters',
          }),

        options: {
          auth: 'jwt',
          tags: ['api'],
          validate: {
            headers: headersValidation,
          },
        },
      },
      {
        method: 'GET',
        path: '/encounters/{id}',
        handler: (request, h) => dispatch({ type: 'getOneEncounter', id: request.params.id }),
        options: {
          tags: ['api'],
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
        handler: (request, h) => dispatch({ type: 'removeEncounter', id: request.params.id }),
        options: {
          tags: ['api'],

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
        handler: (request, h) =>
          dispatch({
            type: 'createEncounter',
            encounter: {
              name: request.payload.name,
              age: request.payload.age,
              bloodType: request.payload.bloodType,
            },
          }),
        options: {
          tags: ['api'],
          validate: {
            headers: headersValidation,
            payload: EncounterModel,
          },
        },
      },
      {
        method: 'PUT',
        path: '/encounters/{id}',
        handler: (request, reply) =>
          dispatch({
            type: 'modifyEncounter',
            id: request.params.id,
            modify: {
              name: request.payload.name,
              age: request.payload.age,
              bloodType: request.payload.bloodType,
            },
          }),
        options: {
          tags: ['api'],
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
  },
};
