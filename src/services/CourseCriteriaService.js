import CourseCriteriaRepo from "../repositories/CourseCriteriaRepo.js";

const CourseCriteriaService = {
    async getCourseCriteria(courseId) {
        return await CourseCriteriaRepo.getCourseCriteria(courseId);
    },
    async createCourseCriteria(courseCriteria) {
        return await CourseCriteriaRepo.createCourseCriteria(courseCriteria);
    },
    async updateCourseCriteria(id, courseCriteria) {
        return await CourseCriteriaRepo.updateCourseCriteria(id, courseCriteria);
    }
};

export default CourseCriteriaService;