import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "uploadthing.com",
				port: "",
			},
		],
	},
};

export default nextConfig;
