import dotenv from 'dotenv';
import path from 'path';

// Load local .env file if available
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  railkitApiKey: process.env.RAILKIT_API_KEY || '',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
};

export function validateEnv() {
  if (!config.railkitApiKey && config.env === 'production') {
    console.warn('[WARN] RAILKIT_API_KEY is not defined in environment variables. Railway requests may fail or operate with fallback data.');
  }
}
