import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';

const app = express();

// Helmet HTTP security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Live requests are temporarily limited. Please wait before refreshing.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', globalLimiter);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  if (config.env !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      service: 'RailETA API',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.env,
    },
    meta: {
      source: 'system',
      timestamp: new Date().toISOString(),
    },
  });
});

// Import route modules
import stationRoutes from './routes/station.routes';
import trainRoutes from './routes/train.routes';
import bookingRoutes from './routes/booking.routes';

// Mount route modules
app.use('/api/stations', stationRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api', bookingRoutes);

export default app;
