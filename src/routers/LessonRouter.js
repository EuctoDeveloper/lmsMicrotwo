import express from 'express';
import validateInput from '../middlewares/validate.js';
import verifyToken from '../middlewares/verifyToken.js';
import { addLessonSchema, deactivateLessonSchema, getLessonsByModuleIdSchema, getLessonSchema, updateLessonSchema } from '../validations/LessonValidation.js';
import LessonController from '../controllers/LessonController.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500 * 1024 * 1024 },
}).fields([
    { name: 'source', maxCount: 1 },
  ]);

const lessonRouter = express.Router();

lessonRouter.get('/list/:moduleId', verifyToken, validateInput(getLessonsByModuleIdSchema), LessonController.getLessonsByModuleId);
lessonRouter.get('/:id', verifyToken, validateInput(getLessonSchema), LessonController.getLesson);
lessonRouter.post('/', verifyToken, upload, validateInput(addLessonSchema), LessonController.createLesson);
lessonRouter.put('/:id', verifyToken, upload, validateInput(updateLessonSchema), LessonController.updateLesson);
lessonRouter.get('/deactivate/:id', verifyToken, validateInput(deactivateLessonSchema), LessonController.deactivateLesson);
lessonRouter.get('/activate/:id', verifyToken, validateInput(deactivateLessonSchema), LessonController.activateLesson);
lessonRouter.post('/activity', verifyToken, LessonController.saveLessonActivity);
lessonRouter.get('/activity/:lessonId', verifyToken, LessonController.fetchLessonActivity);

export default lessonRouter;