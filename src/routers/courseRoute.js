import express from 'express';
import validateInput from '../middlewares/validate.js';
import CourseController from '../controllers/CourseController.js';
import { addCourseSchema, getCourseSchema, updateCourseSchema, getAllCoursesSchema, deactivateCourseSchema, addCourseCriteriaSchema, updateCourseCriteriaSchema, getCourseCriteriaSchema } from '../validations/CourseValidation.js';
import verifyToken from '../middlewares/verifyToken.js';
import CourseCriteriaController from '../controllers/CourseCriteriaController.js';


const courseRouter = express.Router();

courseRouter.post('/add', verifyToken, validateInput(addCourseSchema), CourseController.addCourse);
courseRouter.get('/', verifyToken, validateInput(getAllCoursesSchema), CourseController.getAllCourses);
courseRouter.get('/:id', verifyToken, validateInput(getCourseSchema) ,CourseController.getCourseById);
courseRouter.put('/:id', verifyToken, validateInput(updateCourseSchema), CourseController.updateCourse);
courseRouter.get('/deactivate/:id', verifyToken, validateInput(deactivateCourseSchema), CourseController.deactivateCourse);

courseRouter.post('/addCriteria', verifyToken, validateInput(addCourseCriteriaSchema), CourseCriteriaController.addCourseCriteria);
courseRouter.put('/updateCriteria/:courseId', verifyToken, validateInput(updateCourseCriteriaSchema), CourseCriteriaController.updateCourseCriteria);
courseRouter.get('/getCriteria/:courseId', verifyToken, validateInput(getCourseCriteriaSchema), CourseCriteriaController.getCourseCriteria);

export default courseRouter;