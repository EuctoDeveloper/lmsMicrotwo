import ModuleRepo from "../repositories/ModuleRepo.js";

const ModuleService = {
    getModules: async (courseId) => {
        return await ModuleRepo.getModules(courseId);
    },
    getModuleById: async (id) => {
        return await ModuleRepo.getModuleById(id);
    },
    createModule: async (module) => {
        return await ModuleRepo.createModule(module);
    },
    updateModule: async (id, module) => {
        return await ModuleRepo.updateModule(id, module);
    },
    deactivateModule: async (id) => {
        return await ModuleRepo.deactivateModule(id);
    },
    activateModule: async (id) => {
        return await ModuleRepo.activateModule(id);
    }
}

export default ModuleService;