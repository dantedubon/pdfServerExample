/* eslint-disable no-console, no-param-reassign */

import * as mototaxi from 'mototaxi';
import { AwilixResolutionError } from 'awilix';
import container from '../container';

import { commandHandlers } from '../../domain';

export function register(server: Object, options: Object, next: () => mixed) {
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

  next();
}

exports.register.attributes = { name: 'mototaxi', version: '1.0.0' };
