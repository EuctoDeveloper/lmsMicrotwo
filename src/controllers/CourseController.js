import CourseService from "../services/CourseService.js";
import catcher from "../utils/catcher.js";

const CourseController = {
    addCourse: catcher(async (req, res) => {
        const { title, description, startDate, endDate,  } = req.body;
        const createdBy = req.user.userId;
        const course = await CourseService.addCourse({ title, description, startDate, endDate, createdBy });
        res.status(201).json({message:'Course Created Successfully', course});
    }),
    getAllCourses: catcher(async (req, res) => {
        const courses = await CourseService.getAllCourses(req.query.type);
        res.status(200).json({courses});
    }),
    getCourseById: catcher(async (req, res) => {
        const { id } = req.params;
        const course = await CourseService.getCourseById(id);
        res.status(200).json({course});
    }),
    updateCourse: catcher(async (req, res) => {
        const { id } = req.params;
        const { title, description, startDate, endDate } = req.body;
        const course = await CourseService.updateCourse(id, { title, description, startDate, endDate });
        res.status(200).json({message:'Course Updated Successfully', course});
    }),
    deactivateCourse: catcher(async (req, res) => {
        const { id } = req.params;
        await CourseService.deactivateCourse(id);
        res.status(200).json({message:'Course Deactivated Successfully'});
    })
}

export default CourseController;