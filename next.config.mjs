/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['noana-admin-images-hml.s3.amazonaws.com'],
    loader: 'imgix',
    path: '/assets/img/',
  },
  async rewrites() {
    return [
      {
        source: '/api/password_reset',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/password_reset/`,
      },
      {
        source: '/api/change_password',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/change_password/`,
      },
      {
        source: '/api/notification/messages_totalizer/',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/notification/messages_totalizer/`,
      },
    ]
  },
}

export default nextConfig
