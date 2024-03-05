/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    env:{
        API_URL:process.env.API_URL,
    },
    images:{
        remotePatterns:[
            {
                protocol:'http',
                hostname:'localhost',
            }
        ]
    }
};

export default nextConfig;
