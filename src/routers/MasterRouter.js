import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import MasterController from '../controllers/MasterConroller.js';
import validateInput from '../middlewares/validate.js';
import { addMasterSchema, getMasterSchema, updateMasterSchema } from '../validations/MastersValidation.js';

const masterRouter = express.Router();

masterRouter.get('/locations', verifyToken, MasterController.getLocations);
masterRouter.post('/locations/add', verifyToken, validateInput(addMasterSchema), MasterController.createLocation);
masterRouter.get('/locations/:id', verifyToken, validateInput(getMasterSchema), MasterController.getLocationById);
masterRouter.put('/locations/:id', verifyToken, validateInput(updateMasterSchema), MasterController.updateLocation);

masterRouter.get('/departments', verifyToken, MasterController.getDepartments);
masterRouter.post('/departments/add', verifyToken, validateInput(addMasterSchema), MasterController.createDepartment);
masterRouter.get('/departments/:id', verifyToken, validateInput(getMasterSchema), MasterController.getDepartmentById);
masterRouter.put('/departments/:id', verifyToken, validateInput(updateMasterSchema), MasterController.updateDepartment);

masterRouter.get('/designations', verifyToken, MasterController.getDesignations);
masterRouter.post('/designations/add', verifyToken, validateInput(addMasterSchema), MasterController.createDesignation);
masterRouter.get('/designations/:id', verifyToken, validateInput(getMasterSchema), MasterController.getDesignationById);
masterRouter.put('/designations/:id', verifyToken, validateInput(updateMasterSchema), MasterController.updateDesignation);

masterRouter.get('/centres', verifyToken, MasterController.getCenters);
masterRouter.post('/centres/add', verifyToken, validateInput(addMasterSchema), MasterController.createCenter);
masterRouter.get('/centres/:id', verifyToken, validateInput(getMasterSchema), MasterController.getCenterById);
masterRouter.put('/centres/:id', verifyToken, validateInput(updateMasterSchema), MasterController.updateCenter);

masterRouter.get('/groups', verifyToken, MasterController.getGroups);
masterRouter.post('/groups/add', verifyToken, validateInput(addMasterSchema), MasterController.createGroup);
masterRouter.get('/groups/:id', verifyToken, validateInput(getMasterSchema), MasterController.getGroupById);
masterRouter.put('/groups/:id', verifyToken, validateInput(updateMasterSchema), MasterController.updateGroup);

masterRouter.get('/Branches', verifyToken, MasterController.getBranches);
masterRouter.post('/Branches/add', verifyToken, validateInput(addMasterSchema), MasterController.createBranch);
masterRouter.get('/Branches/:id', verifyToken, validateInput(getMasterSchema), MasterController.getBranchById);
masterRouter.put('/Branches/:id', verifyToken, validateInput(updateMasterSchema), MasterController.updateBranch);


export default masterRouter;