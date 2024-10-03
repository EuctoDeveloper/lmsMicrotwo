import express from 'express';
import validateInput from '../middlewares/validate.js';
import verifyToken from '../middlewares/verifyToken.js';
import { addLessonSchema, deactivateLessonSchema, getLessonsByModuleIdSchema, getLessonSchema, updateLessonSchema } from '../validations/LessonValidation.js';
import LessonController from '../controllers/LessonController.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(), // Store the file in memory (buffer) for direct S3 upload
    limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
}).fields([
    { name: 'source', maxCount: 1 },  // First field, can accept 1 file
    { name: 'thumbnail', maxCount: 1 },  // Second field, can accept 1 file
  ]);

const lessonRouter = express.Router();

lessonRouter.get('/list/:moduleId', verifyToken, validateInput(getLessonsByModuleIdSchema), LessonController.getLessonsByModuleId);
lessonRouter.get('/:id', verifyToken, validateInput(getLessonSchema), LessonController.getLesson);
lessonRouter.post('/', verifyToken, upload, validateInput(addLessonSchema), LessonController.createLesson);
lessonRouter.put('/:id', verifyToken, upload, validateInput(updateLessonSchema), LessonController.updateLesson);
lessonRouter.get('/deactivate/:id', verifyToken, validateInput(deactivateLessonSchema), LessonController.deactivateLesson);



export default lessonRouter;