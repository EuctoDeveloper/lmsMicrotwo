import Course from "../models/CourseModel.js";
import CourseCriteriaRepo from "./CourseCriteriaRepo.js";

const CourseRepo = {
    async getAllCourses(type) {
        const filter = {};

        if (type !== "all") {
            if(type === "inactive") {
                filter.isActive = false;
            }
            if(type === "expired") {
                filter.endDate = { $lt: new Date() };
                filter.isActive = true;
            }
            if(type === "upcoming") {
                filter.startDate = { $gt: new Date() };
                filter.isActive = true;
            }
            if(type === "active") {
                filter.isActive = true;
                filter.startDate = { $lt: new Date() };
                filter.endDate = { $gt: new Date() };
            }
        }

        return await Course.aggregate([{
            $match: filter
        },
    
        {
            $lookup: {
                from: 'coursecriterias',
                localField: 'courseId',
                foreignField: 'courseId',
                as: 'courseCriteria'
            }
        }]);
    

    // return await Course.aggregate(courseCriteria);
    },
    async getCourseById(id) {
        let course = await Course.findOne({courseId: id});
        let courseCriteria = await CourseCriteriaRepo.getCourseCriteria(id);
        return {...course._doc, courseCriteria};
    },
    async createCourse(course) {
        return await Course.create(course);
    },
    async updateCourse(id, course) {
        return await Course.updateOne({courseId: id}, course, { new: true });
    },
    async deactivateCourse(id) {
        return await Course.updateOne({courseId: id}, {isActive: false});
    },
    async activateCourse(id) {
        return await Course.updateOne({courseId: id}, {isActive: true});
    }
};


export default CourseRepo;