import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { seedChannels } from './seed.js';
import authRoutes from './routes/auth.js';
import channelRoutes from './routes/channels.js';
import { initSocket } from './socket/index.js';

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/discordclone';

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.type('html').send(`
    <h1>Discord Clone API Server</h1>
    <p>This is the backend only. Open the app here:</p>
    <p><a href="${CLIENT_URL}">${CLIENT_URL}</a></p>
    <p>API health: <a href="/api/health">/api/health</a></p>
  `);
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);

initSocket(server, CLIENT_URL);

async function start() {
  try {
    await connectDB(MONGODB_URI);
    await seedChannels();
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
