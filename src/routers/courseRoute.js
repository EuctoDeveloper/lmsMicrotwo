import express from 'express';
import validateInput from '../middlewares/validate.js';
import CourseController from '../controllers/CourseController.js';
import { addCourseSchema, getCourseSchema, updateCourseSchema, getAllCoursesSchema, deactivateCourseSchema, addCourseCriteriaSchema, updateCourseCriteriaSchema, getCourseCriteriaSchema } from '../validations/CourseValidation.js';
import verifyToken from '../middlewares/verifyToken.js';
import CourseCriteriaController from '../controllers/CourseCriteriaController.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, 
}).fields([
    { name: 'thumbnail', maxCount: 1 }, 
  ]);
 
const courseRouter = express.Router();

courseRouter.post('/add', verifyToken, upload, validateInput(addCourseSchema), CourseController.addCourse);
courseRouter.get('/', verifyToken, validateInput(getAllCoursesSchema), CourseController.getAllCourses);
courseRouter.get('/:id', verifyToken, validateInput(getCourseSchema) ,CourseController.getCourseById);
courseRouter.put('/:id', verifyToken, upload, validateInput(updateCourseSchema), CourseController.updateCourse);
courseRouter.get('/deactivate/:id', verifyToken, validateInput(deactivateCourseSchema), CourseController.deactivateCourse);
courseRouter.get('/activate/:id', verifyToken, validateInput(deactivateCourseSchema), CourseController.activateCourse);

courseRouter.post('/addCriteria', verifyToken, validateInput(addCourseCriteriaSchema), CourseCriteriaController.addCourseCriteria);
courseRouter.put('/updateCriteria/:courseId', verifyToken, validateInput(updateCourseCriteriaSchema), CourseCriteriaController.updateCourseCriteria);
courseRouter.get('/getCriteria/:courseId', verifyToken, validateInput(getCourseCriteriaSchema), CourseCriteriaController.getCourseCriteria);

export default courseRouter;