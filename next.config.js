/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  register: true,
  skipWaiting: true,
  reactStrictMode: true,
})

// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
