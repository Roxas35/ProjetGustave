module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '22cdf2fdeba209ed5e9585013f37d803'),
  },
});
