/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: process.env.API_HOSTNAME,
				port: process.env.API_PORT,
				pathname: process.env.API_PATHNAME,
			},
		],
	},
};

export default nextConfig;
