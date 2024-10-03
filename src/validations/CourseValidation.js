import Joi from "joi";

export const addCourseSchema = {
     body: Joi.object({
         title: Joi.string().required(),
         description: Joi.string().required(),
         startDate: Joi.date().required(),
         endDate: Joi.date().required(),
     })
}
export const getAllCoursesSchema = {
    query: Joi.object({
        type: Joi.string().valid('all', 'active', 'inactive', 'expired').default('all'),
    })
}
export const updateCourseSchema = {
    body: Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
    })
}
export const getCourseSchema = {
    params: Joi.object({
        id: Joi.number().required()
    })
}
export const deactivateCourseSchema = {
    params: Joi.object({
        id: Joi.number().required()
    })
}

export const addCourseCriteriaSchema = {
    body: Joi.object({
        courseId: Joi.number().required(),
        userRole: Joi.array().items(Joi.string()).required(),
        location: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        department: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        group: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        center: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        designation: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        branch: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
    })
}
export const updateCourseCriteriaSchema = {
    body: Joi.object({
        userRole: Joi.array().items(Joi.string()).required(),
        location: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        department: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        group: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        center: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        designation: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
        branch: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string().valid('*'))).required(),
    }),
    params: Joi.object({
        courseId: Joi.number().required()
    })
}
export const getCourseCriteriaSchema = {
    params: Joi.object({
        courseId: Joi.number().required()
    })
}
export const deleteCourseCriteriaSchema = {
    params: Joi.object({
        courseId: Joi.number().required()
    })
}
