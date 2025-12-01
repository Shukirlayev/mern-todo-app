import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import todoRoutes from './routes/todo.route.js';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // Universal route to serve React app (Express 6+ compatible)
  app.get('/:path(*)', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('❌ Server start failed:', error.message);
  }
};

startServer();
