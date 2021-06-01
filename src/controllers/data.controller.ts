import { Request, Response, Router } from 'express';
import { getAccessToken } from '../data/access.dao';

const router = Router();

router.use(async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ', 2)[1];
  if(!token) {
    return res.status(401).json({
      message: 'Access token Missing'
    });
  }
  const username = await getAccessToken(token);
  if(!username) {
    return res.status(401).json({
      message: 'Invalid access_token'
    });
  }
  req.user = username;
  return next(undefined, req)
})

router.get('/something', async (req: Request, res: Response) => {
  console.log(req.user);
  res.json({
    message: "Business Logic"
  })
});

export {
  router as dataRouter
}