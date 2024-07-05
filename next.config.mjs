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
