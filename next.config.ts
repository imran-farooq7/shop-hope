import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "dqcikbw5lf.ufs.sh",
				port: "",
			},
		],
	},
};

export default nextConfig;
