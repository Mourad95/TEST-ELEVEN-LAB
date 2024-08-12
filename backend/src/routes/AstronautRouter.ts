// src/routes/AstronautRouter.ts
import express from 'express';
import AstronautController from '../controllers/AstronautController';

const router = express.Router();

router.get('/allAstros', AstronautController.getAll);
router.get('/:id', AstronautController.getById);
router.post('/create', AstronautController.create);
router.post('/update/:id', AstronautController.update);
router.post('/delete/:id', AstronautController.delete);

export default router;
