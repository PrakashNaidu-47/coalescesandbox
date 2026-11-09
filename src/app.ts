import express, { Application } from 'express';
import { slidingWindowRateLimiter } from './middleware/rateLimiter';

const app: Application = express();

app.use(express.json());
app.use(slidingWindowRateLimiter({ windowMs: 60000, maxRequests: 100 }));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;
