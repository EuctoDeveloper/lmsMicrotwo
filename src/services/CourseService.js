import CourseCriteriaRepo from "../repositories/CourseCriteriaRepo.js";
import CourseRepo from "../repositories/CourseRepo.js";

const CourseService = {
    addCourse: async (course) => {
        return await CourseRepo.createCourse(course);
    },
    getAllCourses: (type) => {
        return CourseRepo.getAllCourses(type);
    },
    getCourseById: (id) => {
        return CourseRepo.getCourseById(id);
    },
    updateCourse: (id, course) => {
        return CourseRepo.updateCourse(id, course);
    },
    deactivateCourse: async (id) => {
        // await CourseCriteriaRepo.deleteCourseCriteriaByCourseId(id);
        return await CourseRepo.deactivateCourse(id);
    },
    activateCourse: async (id) => {
        // await CourseCriteriaRepo.deleteCourseCriteriaByCourseId(id);
        return await CourseRepo.activateCourse(id);
    }
}

export default CourseService;