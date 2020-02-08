// Library
import { Router } from 'express';
// Middlewares
import { getRecipeEndPointValidator } from '../middlewares';
// Controllers
import { getBestRecipes } from '../controller/recipes';
const router = Router();

// Routes
router.get('/', getRecipeEndPointValidator, getBestRecipes);

export default router;
