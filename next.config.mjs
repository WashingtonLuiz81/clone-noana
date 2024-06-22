/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.hml.noana.link',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/password_reset',
        destination: `${process.env.NEXT_APP_API_URL}/password_reset/`,
      },
      {
        source: '/api/change_password',
        destination: `${process.env.NEXT_APP_API_URL}/change_password/`,
      },
    ]
  },
}

export default nextConfig
