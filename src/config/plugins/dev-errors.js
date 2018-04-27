export default {
  plugin: 'hapi-dev-errors',
  options: {
    showErrors: process.env.NODE_ENV !== 'production',
    useYouch: true,
  },
};
