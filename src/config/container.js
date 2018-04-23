import { createContainer, Lifetime, asValue } from 'awilix';
import db from '../models';

const container = createContainer();

function toCamel(a): string {
  return a.replace(/_([a-z])/gi, ($0, $1): string => $1.toUpperCase());
}

Object.keys(db)
  .filter((key) => key.toLowerCase() !== 'sequelize')
  .forEach((model) => {
    const keyValue = `${toCamel(model.toLowerCase())}Model`;
    container.register({
      [keyValue]: asValue(db[model]),
    });
  });

container.loadModules([`${__dirname}/../domain/command-handlers/*.js`], {
  formatName: (name, descriptor) => `${descriptor.value.name}Handler`,
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
});

container.loadModules([`${__dirname}/../data/repositories/*.js`], {
  formatName: (name) => `${toCamel(name)}Repository`,
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
});
console.log('The container has the following objects');
console.log(container.registrations);
export default container;
