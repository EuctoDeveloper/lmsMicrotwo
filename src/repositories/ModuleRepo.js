import Module from "../models/ModuleModel.js";

const ModuleRepo = {
    getModules: async (course) => {
        return await Module.aggregate([
            { $match: { course: parseInt(course) } },
            {
            $lookup: {
                from: 'lessons',
                localField: 'moduleId',
                foreignField: 'module',
                as: 'lessons'
            }
            }
        ]);
    },
    getModuleById: async (id) => {
        return await Module.findOne({moduleId: id});
    },
    createModule: async (module) => {
        return await Module.create(module);
    },
    updateModule: async (id, module) => {
        return await Module.updateOne(({moduleId: id}), module)
    },
    deactivateModule: async (id) => {
        return await Module.updateOne({moduleId: id}, {isActive: false});
    },
    activateModule: async (id) => {
        return await Module.updateOne({moduleId: id}, {isActive: true});
    }
}

export default ModuleRepo;