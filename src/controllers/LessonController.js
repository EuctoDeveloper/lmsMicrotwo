import LessonService from "../services/LessonService.js";
import catcher from "../utils/catcher.js";

const LessonController = {
    getLesson: catcher(async (req, res) => {
        const { id } = req.params;
        const lesson = await LessonService.getLesson(id);
        res.status(200).json({ lesson });
    }),
    getLessonsByModuleId: catcher(async (req, res) => {
        const { moduleId } = req.params;
        const lessons = await LessonService.getLessonsByModuleId(moduleId);
        res.status(200).json({ lessons });
    }),
    createLesson: catcher(async (req, res) => {
        const { title, moduleId, courseId, type, source, content, totalGrade, questions } = req.body;
        const lesson = await LessonService.createLesson({ title, module: moduleId, course: courseId, type, source, content, totalGrade, questions }, req.files);
        res.status(201).json({ message: `${type === "video" ? 'Lesson' : 'Assessment'} Created Successfully`, lesson });
    }),
    updateLesson: catcher(async (req, res) => {
        const { id } = req.params;
        const { title, type, source, content, totalGrade, questions } = req.body;
        const lesson = await LessonService.updateLesson(id, { title, type, source, content, totalGrade, questions }, req.files);
        res.status(200).json({ message: 'Lesson Updated Successfully', lesson });
    }),
    deactivateLesson: catcher(async (req, res) => {
        const { id } = req.params;
        await LessonService.deactivateLesson(id);
        res.status(200).json({ message: 'Lesson Deactivated Successfully' });
    }),
    activateLesson: catcher(async (req, res) => {
        const { id } = req.params;
        await LessonService.activateLesson(id);
        res.status(200).json({ message: 'Lesson Activated Successfully' });
    })
}


export default LessonController;