import express from 'express';
import validateInput from '../middlewares/validate.js';
import ModuleController from '../controllers/ModuleController.js';
import { addModuleSchema, getModuleSchema, updateModuleSchema, deactivateModuleSchema } from '../validations/ModuleValidation.js';
import verifyToken from '../middlewares/verifyToken.js';



const moduleRouter = express.Router();

moduleRouter.post('/add', verifyToken, validateInput(addModuleSchema), ModuleController.createModule);
moduleRouter.get('/', verifyToken, ModuleController.getModules);
moduleRouter.get('/:id', verifyToken, validateInput(getModuleSchema) ,ModuleController.getModuleById);
moduleRouter.put('/:id', validateInput(updateModuleSchema), ModuleController.updateModule);
moduleRouter.get('/deactivate/:id', verifyToken, validateInput(deactivateModuleSchema), ModuleController.deactivateModule);


export default moduleRouter;