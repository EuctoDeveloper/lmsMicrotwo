import CourseCriteria from "../models/CourseCriteriaModel.js";;

const CourseCriteriaRepo = {
    async getCourseCriteria(courseId) {
        return await CourseCriteria.find({ courseId });
    },
    async createCourseCriteria(courseCriteria) {
        console.log(courseCriteria);
        return await CourseCriteria.create(courseCriteria);
    },
    async updateCourseCriteria(id, courseCriteria) {
        return await CourseCriteria.findByIdAndUpdate(id, courseCriteria, { new: true });
    },
    async deleteCourseCriteria(id) {
        return await CourseCriteria.findByIdAndDelete(id);
    },
    async deleteCourseCriteriaByCourseId(courseId) {
        return await CourseCriteria.deleteMany({ courseId });
    }
}

export default CourseCriteriaRepo;