import Lesson from "../models/LessonModel.js";

const LessonRepo = {
    getLessonById: async (id) => {
        return await Lesson.findOne({lessonId: id});
    },
    createLesson: async (lesson) => {
        return await Lesson.create(lesson);
    },
    updateLesson: async (id, lesson) => {
        return await Lesson.updateOne({lessonId: id}, lesson);
    },
    deactivateLesson: async (id) => {
        return await Lesson.updateOne({lessonId: id}, {isActive: false});
    },
    activateLesson: async (id) => {
        return await Lesson.updateOne({lessonId: id}, {isActive: true});
    },
    getLessonsByModuleId: async (moduleId, selectInactive = false) => {
        return await Lesson.find({ module: moduleId, ...(!selectInactive ? {isActive: true} : {})});
    },
    deleteLessonsByModuleId: async (moduleId) => {
        return await Lesson.deleteMany({ moduleId });
    },
    deleteLessonsByCourseId: async (courseId) => {
        return await Lesson.deleteMany({ courseId });
    }
}

export default LessonRepo;