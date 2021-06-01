import { Request, Response, Router } from 'express';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  //TODO write the logic
  res.json({
    message: 'login route'
  })
});

export {
  router as authRouter
}

