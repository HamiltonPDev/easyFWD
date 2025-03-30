import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/scss")],
    additionalData: `@import "main.scss";`,
  },
};

export default nextConfig;
