/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Redirect /board to home page
    redirects: async () => {
        return [
            {
                source: '/board',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
