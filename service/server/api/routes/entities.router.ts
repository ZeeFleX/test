import express from 'express';
import EntitiesController from '../controllers/entities.controller';

const router = express.Router();

router.get('/', EntitiesController.get().all);
router.post('/', EntitiesController.post().updateEntity);

export default router;
