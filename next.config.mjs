/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'skira.caucalamdev.io.vn',
            },
            {
                // DEV ONLY
                protocol: 'https',
                hostname: 'tailwindui.com',
            },
            {
                protocol: 'https',
                hostname: 'scontent.fsgn2-10.fna.fbcdn.net',
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
