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
        res.status(200).json({ message: `${type === "video" ? 'Lesson' : 'Assessment'} Updated Successfully`, lesson });
    }),
    deactivateLesson: catcher(async (req, res) => {
        const { id } = req.params;
        const lesson = await LessonService.deactivateLesson(id);
        res.status(200).json({ message: `${lesson.type === "video" ? 'Lesson' : 'Assessment'} Deactivated Successfully` });
    }),
    activateLesson: catcher(async (req, res) => {
        const { id } = req.params;
        const lesson = await LessonService.activateLesson(id);
        res.status(200).json({ message: `${lesson.type === "video" ? 'Lesson' : 'Assessment'} Activated Successfully` });
    }),
    saveLessonActivity: catcher(async (req, res) => {  
        const { lessonId, activity } = req.body;
        console.log(await LessonService.saveLessonActivity(lessonId, activity));
        res.status(200).json({ message: `Lesson Activity Saved Successfully` });
    }),
    fetchLessonActivity: catcher(async (req, res) => {
        const { lessonId } = req.params;
        const activity = await LessonService.fetchLessonActivity(lessonId);
        res.status(200).json({ activity });
    }),
}


export default LessonController;