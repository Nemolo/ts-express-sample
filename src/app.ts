import { config } from 'dotenv';
config();
import express, { Request, Response } from 'express';
require('express-async-errors');
import { json } from 'body-parser';
import { authRouter } from './controllers/auth.controller';
import { dataRouter } from './controllers/data.controller';

declare global {
  namespace Express {
    interface Request {
      user?: string
    }
  }
}

const app = express();
const port = process.env.PORT || 3000;
app.use(json())

const indexRouter = express.Router();
indexRouter.get('', async (req: Request, res: Response) => {
  res.json({
    message: 'Hello World!'
  });
})

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/data', dataRouter);

//catch all route, not found
app.use(async (req: Request, res: Response) => {
  return res.status(404).send();
})

//error handling
app.use(async (err: any, req: Request, res: Response, next: Function) => {
  if (err) {
    res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});