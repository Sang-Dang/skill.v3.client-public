/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "skira.caucalamdev.io.vn",
            },
            {
                // DEV ONLY
                protocol: "https",
                hostname: "tailwindui.com",
            },
        ],
    },
}

export default nextConfig;
