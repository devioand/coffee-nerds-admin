/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/orders",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
