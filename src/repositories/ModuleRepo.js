import Module from "../models/ModuleModel.js";

const ModuleRepo = {
    getModules: async () => {
        return await Module.find();
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
    }
}

export default ModuleRepo;