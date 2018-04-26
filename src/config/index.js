/* eslint-disable import/no-dynamic-require, global-require */
import server from './server';

const fs = require('fs');

const getDirectoriesInPath = (p) => fs.readdirSync(p).filter((f) => fs.statSync(`${p}/${f}`).isDirectory());
const getFilesInDirectory = (p) => fs.readdirSync(p).filter((f) => !fs.statSync(`${p}/${f}`).isDirectory());
const getArrayFromFiles = (path) =>
  getFilesInDirectory(path)
    // $FlowFixMe
    .map((filename) => require(`${path}/${filename}`).default)
    .map((x) => [].concat(x))
    .reduce((prev, curr) => prev.concat(curr));

const infrastructurePlugins = getArrayFromFiles(`${__dirname}/plugins`);

const routePlugins = getDirectoriesInPath(`${__dirname}/../routes`)
  .map((d) => ({
    route: `${__dirname}/../routes/${d}`,
  }))
  // $FlowFixMe
  .map(({ route }) => require(`${route}`).default);
const plugins: Array<any> = [].concat(infrastructurePlugins, routePlugins);
const register = { plugins };
export { server, register };
