const withPWA = require('next-pwa')({
  dest: 'public',
  disable: false,
  register: true,
})

module.exports = withPWA({
  reactStrictMode: true,
})