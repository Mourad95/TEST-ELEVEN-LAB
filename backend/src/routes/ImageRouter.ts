import express from 'express';
import ImageController from '../controllers/ImageController';

const router = express.Router();

router.get('/allImage', ImageController.getAll);
router.get('/:id', ImageController.getById);
router.post('/create/', ImageController.create);
router.post('/update/:id', ImageController.update);
router.post('/delete/:id', ImageController.delete);

export default router;
