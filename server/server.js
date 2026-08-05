import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import contactRoutes from './routes/contactRoutes.js';
import { initDb } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
// Allow local dev (any localhost port) and the live GitHub Pages site.
// CLIENT_URL can add/override the production origin without a code change.
const allowedOrigins = [/^http:\/\/localhost:\d+$/, 'https://patelaman018.github.io'];
if (process.env.CLIENT_URL) allowedOrigins.push(process.env.CLIENT_URL);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Navya Customization API is running.' });
});

app.use('/api', contactRoutes);

initDb()
  .then(() => {
    console.log('PostgreSQL connected & ready');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('PostgreSQL initialization error:', error);
    process.exit(1);
  });
