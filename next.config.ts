import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingIncludes: {
    '/*': ['./public/r/*.json'],
  },
};

export default nextConfig;
