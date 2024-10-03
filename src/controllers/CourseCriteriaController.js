import CourseCriteriaService from "../services/CourseCriteriaService.js";
import catcher from "../utils/catcher.js";

const CourseCriteriaController = {
    addCourseCriteria: catcher(async (req, res) => {
        const { courseId, userRole, location, department, group, center, designation, branch, } = req.body;
        const courseCriteria = await CourseCriteriaService.createCourseCriteria({ courseId, criteria:{
            userRole, location, department, group, center, designation, branch
        } });
        res.status(201).json({message:'Course Criteria Created Successfully', courseCriteria});
    }),
    getCourseCriteria: catcher(async (req, res) => {
        const { courseId } = req.params;
        const courseCriteria = await CourseCriteriaService.getCourseCriteria(courseId);
        res.status(200).json({courseCriteria});
    }),
    updateCourseCriteria: catcher(async (req, res) => {
        const { id } = req.params;
        const { criteria } = req.body;
        const courseCriteria = await CourseCriteriaService.updateCourseCriteria(id, { criteria });
        res.status(200).json({message:'Course Criteria Updated Successfully', courseCriteria});
    }),
}

export default CourseCriteriaController;