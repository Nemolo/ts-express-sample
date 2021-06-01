import { config } from 'dotenv';
config();
require('express-async-errors');
import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { authRouter } from './controllers/auth.controller';
import { privateRouter } from './controllers/private.controller';
import { redis } from './data/dao';

declare global {
  namespace Express {
    interface Request {
      user?: string
    }
  }
}

const port = process.env.APP_PORT || 3000;
const app = express();

app.use(json());
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
app.use('/private', privateRouter);

app.use(async (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Endpoint not found'
  })
});

app.use(async (err: any, req: Request, res: Response, next: Function) => {
  if(err) {
    res.status(500).json({
      message: "Ooops, something went wrong",
      detail: err?.message || err
    })
  }
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});