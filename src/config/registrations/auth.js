/* eslint-disable import/no-dynamic-require, global-require */
export default [
  {
    // $FlowFixMe
    plugin: require(`${__dirname}/../plugins/auth/`).default,
  },
];
