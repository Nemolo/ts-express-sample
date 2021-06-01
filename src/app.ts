import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome',
    example: true,
    idontknow: true
  })
});

app.listen(3000, () => {
  console.log('listening');
});