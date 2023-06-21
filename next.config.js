/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/private/restaurant',
        destination: '/private/restaurant/dashboard',
        permanent: true,
      },
      {
        source: '/private/client',
        destination: '/private/client/dashboard',
        permanent: true,
      },
      {
        source: '/form/unregistered',
        destination: '/form',
        permanent: true,
      },
      {
        source: '/form/registered',
        destination: '/form',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
