import { config } from 'dotenv';
config();
import express, { Request, Response } from 'express';
import { authRouter } from './controllers/auth.controller';
import { redis } from './data/dao';

const app = express();
const port = process.env.APP_PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  await redis.set('test', 'success');
  res.json({
    message: 'Welcome',
    example: true,
    idontknow: true,
    testRedis: await redis.get('test')
  })
});

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});