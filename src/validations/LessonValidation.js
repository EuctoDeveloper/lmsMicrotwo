import Joi from "joi";

const addLessonSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        moduleId: Joi.number().required(),
        content: Joi.string().required(),
        type: Joi.string().required().allow('video', 'assesment', 'document', 'gradedAssesment'),
        totalGrade: Joi.number().required(),
        courseId: Joi.number().required(),
        attachment: Joi.any(),
        questions: Joi.array().items(Joi.object({
            question: Joi.string().required(),
            options: Joi.array().items(Joi.string()).required(),
            correctAnswer: Joi.string().required(),
            points: Joi.number().required()
        })).optional()
    })
}
const updateLessonSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        type: Joi.string().required(),
        totalGrade: Joi.number().required(),
        questions: Joi.array().items(Joi.object({
            question: Joi.string().required(),
            options: Joi.array().items(Joi.string()).required(),
            correctAnswer: Joi.string().required(),
            points: Joi.number().required()
        })).optional()
    }),
    params: Joi.object({
        id: Joi.number().required()
    })
}
const getLessonSchema = {
    params: Joi.object({
        id: Joi.number().required()
    })
}
const deactivateLessonSchema = {
    params: Joi.object({
        id: Joi.number().required()
    })
};
const getLessonsByModuleIdSchema = {
    params: Joi.object({
        moduleId: Joi.number().required()
    })
}
export {
    addLessonSchema,
    updateLessonSchema,
    getLessonSchema,
    deactivateLessonSchema,
    getLessonsByModuleIdSchema
}