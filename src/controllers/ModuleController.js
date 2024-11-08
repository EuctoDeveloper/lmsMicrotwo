import ModuleService from "../services/ModuleService.js";
import catcher from "../utils/catcher.js";

const ModuleController = {
    getModules: catcher(async (req, res) => {
        const { courseId } = req.params;
        const modules = await ModuleService.getModules(courseId);
        res.status(200).json({modules});
    }),
    getModuleById: catcher(async (req, res) => {
        const { id } = req.params;
        const module = await ModuleService.getModuleById(id);
        res.status(200).json({module});
    }),
    createModule: catcher(async (req, res) => {
        const { title, courseId } = req.body;
        const module = await ModuleService.createModule({ title, course: courseId });
        res.status(201).json({message:'Module Created Successfully', module});
    }),
    updateModule: catcher(async (req, res) => {
        const { id } = req.params;
        const { title } = req.body;
        const module = await ModuleService.updateModule(id, { title });
        res.status(200).json({message:'Module Updated Successfully', module});
    }),
    deactivateModule: catcher(async (req, res) => {
        const { id } = req.params;
        await ModuleService.deactivateModule(id);
        res.status(200).json({message:'Module Deactivated Successfully'});
    }),
    activateModule: catcher(async (req, res) => {
        const { id } = req.params;
        await ModuleService.activateModule(id);
        res.status(200).json({message:'Module Activated Successfully'});
    })
}

export default ModuleController;