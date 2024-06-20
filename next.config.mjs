/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      }, 
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'next-coffee-app.s3.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'next-coffee-app.s3.ap-southeast-2.amazonaws.com',
        port: '',
      },
    ]
  }
};

export default nextConfig;
