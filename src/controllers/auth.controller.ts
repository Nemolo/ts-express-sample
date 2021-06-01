import { compare, genSalt, hash } from 'bcrypt';
import { Request, Response, Router } from 'express';
import { createAccessToken } from '../data/access.dao';
import { getUser, insertUser } from '../data/user.dao';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string, password: string };
  const user = await getUser(username);
  if (!user || !await compare(password, user?.password)) {
    return res.status(403).json({
      message: 'Username or password not valid'
    })
  }
  const accessToken = await createAccessToken(user.username);
  return res.json({
    user,
    access_token: accessToken
  })
});

router.post('/create', async (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string, password: string };
  const user = {
    username,
    password: await hash(password, await genSalt())
  }
  await insertUser(user);
  return res.json(true);
});

export {
  router as authRouter
};