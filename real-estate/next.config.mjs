/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.wallpapersafari.com',
              'img.freepik.com'], // Add domains you use for images here
  },
  source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
};

export default nextConfig;
