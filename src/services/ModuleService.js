import ModuleRepo from "../repositories/ModuleRepo.js";

const ModuleService = {
    getModules: async () => {
        return await ModuleRepo.getModules();
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
    }
}

export default ModuleService;