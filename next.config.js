/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, 
  crossOrigin: 'anonymous',
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*", 
  //       destination: "http://localhost:3000/:path*",
  //     },
  //   ]
  // },
  env: {
    REACT_APP_SECURITY_APPNAME: process.env.REACT_APP_SECURITY_APPNAME,
    REACT_APP_OPERATION_NAME: process.env.REACT_APP_OPERATION_NAME,
  },
};

module.exports = nextConfig;
