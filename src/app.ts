import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/task.routes';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;