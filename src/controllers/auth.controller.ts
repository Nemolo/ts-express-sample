import { compare, genSalt, hash } from 'bcrypt';
import { Request, Response, Router } from 'express';
import { createTokenForUser } from '../data/access.dao';
import { getUser, insertUser } from '../data/user.dao';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await getUser(username);
  
  if(!user || !(await compare(password, user.password)) ) {
    return res.status(401).json({
      message: 'Username or password is incorrect'
    })
  }

  const token = await createTokenForUser(user);

  //TODO write the logic
  return res.json({
    access_token: token
  })
});

router.post('/create-user', async (req: Request, res: Response) => {
  const { username, password, birthDay } = req.body;
  if(!username || !password) {
    return res.status(400).json({
      message: 'username and password fields are needed'
    })
  }
  const hashedPass = await hash(password, await genSalt());
  await insertUser({
    // username: username,
    username,
    password: hashedPass,
    birthDay
  });
  return res.json(true);
});

export {
  router as authRouter
};

