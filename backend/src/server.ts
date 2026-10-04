import app from './app';
import { config, validateEnv } from './config/env';

validateEnv();

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`
🚂 RailETA API Server Running!
═══════════════════════════════════════════════
Port: ${config.port}
Environment: ${config.env}
Health Check: http://localhost:${config.port}/api/health
═══════════════════════════════════════════════
    `);
  });
}
