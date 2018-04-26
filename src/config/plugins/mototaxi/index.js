/* eslint-disable no-console, no-param-reassign, no-unused-vars */

import * as mototaxi from 'mototaxi';
import { AwilixResolutionError } from 'awilix';
import container from '../../container';

import { commandHandlers } from '../../../domain';

const plugin = {
  register: async (server: Object, options: Object) => {
    const logger = {
      log: (message) => {
        console.log(`mototaxi: ${message}`);
      },
    };

    const resolve = (handlerType) => {
      try {
        const resolved = container.resolve(`${handlerType.name}Handler`);
        return resolved;
      } catch (err) {
        if (err instanceof AwilixResolutionError) {
          console.log(err);
        }
        throw err;
      }
    };

    const config = {
      logger,
      commandHandlers,
      resolve,
    };

    const dispatcher = mototaxi.getDispatcher(config);
    server.app.dispatcher = dispatcher;
  },
  name: 'mototaxi',
  version: '1.0.0',
  options: {},
};

export default plugin;
