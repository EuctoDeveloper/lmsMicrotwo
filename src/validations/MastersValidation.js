import Joi from "joi";



const getMasterSchema = {
    params: Joi.object({
        id: Joi.number().required()
    })
}
const addMasterSchema = {
    body: Joi.object({
        name: Joi.string().required()
    })
}
const updateMasterSchema = {
    body: Joi.object({
        name: Joi.string().required()
    }),
    params: Joi.object({
        id: Joi.number().required()
    })
}

export {
    getMasterSchema,
    addMasterSchema,
    updateMasterSchema
}