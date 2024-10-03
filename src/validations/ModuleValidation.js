import Joi from "joi";

export const addModuleSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        courseId: Joi.number().required(),
    })
}
export const updateModuleSchema = {
    body: Joi.object({
        title: Joi.string().required(),
    }),
    params: Joi.object({
        id: Joi.number().required()
    })
}
export const getModuleSchema = {
    params: Joi.object({
        id: Joi.number().required()
    })
}
export const deactivateModuleSchema = {
    params: Joi.object({
        id: Joi.number().required()
    })
};