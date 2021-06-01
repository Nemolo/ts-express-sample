import { config } from 'dotenv';
import express, { Request, Response } from 'express';

config();

const app = express();
const port = process.env.PORT || 3000;

const router = express.Router();
router.get('', async (req: Request, res: Response) => {
  res.json({
    message: 'Hello World!'
  });
})

app.use(router);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});