// Library
import { Router, Request, Response } from 'express';
// Middlewares
import { getRecipeEndPointValidator } from '../middlewares';
const router = Router();

router.get('/', getRecipeEndPointValidator, (req: Request, res: Response) => {
  res.json({ msg: 'Hello' });
});

export default router;
