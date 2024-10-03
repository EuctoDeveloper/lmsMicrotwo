import Joi from "joi";

const addLessonSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        moduleId: Joi.number().required(),
        content: Joi.string().required(),
        type: Joi.string().required().allow('video', 'assesment', 'document', 'gradedAssesment'),
        totalGrade: Joi.number().required(),
        courseId: Joi.number().required(),
    })
}
const updateLessonSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        type: Joi.string().required(),
        totalGrade: Joi.number().required(),
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