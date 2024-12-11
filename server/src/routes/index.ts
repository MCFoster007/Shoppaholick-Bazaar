import type { Request, Response } from 'express';
import express from 'express';
const router = express.Router();

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import apiRoutes from './api/fakeStore-routes.js';
import userRoutes from './api/user-routes.js';

router.use('/api', apiRoutes);
router.use('/user', userRoutes);

// serve up react front-end in production
router.use((_req: Request, res: Response) => {
  const distPath = path.resolve(__dirname, '../../client/dist');
  res.sendFile(path.join(distPath, 'index.html'));
});

export default router;
