import Department from "../models/DeptModel.js";
import Designation from "../models/DesignationModel.js";
import Group from "../models/GroupModel.js";
import Location from "../models/LocationModel.js";
import Branch from "../models/BranchModel.js";
import Center from "../models/CenterModel.js";
import catcher from "../utils/catcher.js";

const MasterController = {
    getLocations: catcher(async (req, res) => {
        const locations = await Location.find({});
        res.status(200).json({locations});
    }),
    createLocation: catcher(async (req, res) => {
        const {name} =  req.body;
        const location = await Location.create({name});
        res.status(200).json({location, message: 'Location Created Successfully'});
    }),
    getLocationById: catcher(async (req, res) => {
        const {id} = req.params;
        const location = await Location.findOne({locationId: id});
        res.status(200).json({location});
    }),
    updateLocation: catcher(async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        const location = await Location.updateOne({ locationId: id }, { name });
        res.status(200).json({location, message: 'Location Updated Successfully'});
    }),


    getDepartments: catcher(async (req, res) => {
        const departments = await Department.find({});
        res.status(200).json({departments});
    }),
    createDepartment: catcher(async (req, res) => {
        const {name} =  req.body;
        const department = await Department.create({name});
        res.status(200).json({department, message: 'Department Created Successfully'});
    }),
    getDepartmentById: catcher(async (req, res) => {
        const {id} = req.params;
        const department = await Department.findOne({departmentId: id});
        res.status(200).json({department});
    }),
    updateDepartment: catcher(async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        const department = await Department.updateOne({ departmentId: id }, { name });
        res.status(200).json({department, message: 'Department Updated Successfully'});
    }),


    getGroups: catcher(async (req, res) => {
        const groups = await Group.find({});
        res.status(200).json({groups});
    }),
    createGroup: catcher(async (req, res) => {
        const {name} =  req.body;
        const group = await Group.create({name});
        res.status(200).json({group, message: 'Group Created Successfully'});
    }),
    getGroupById: catcher(async (req, res) => {
        const {id} = req.params;
        const group = await Group.findOne({groupId: id});
        res.status(200).json({group});
    }),
    updateGroup: catcher(async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        const group = await Group.updateOne({ groupId: id }, { name });
        res.status(200).json({group, message: 'Group Updated Successfully'});
    }),


    getDesignations: catcher(async (req, res) => {
        const designations = await Designation.find({});
        res.status(200).json({designations});
    }),
    createDesignation: catcher(async (req, res) => {
        const {name} =  req.body;
        const designation = await Designation.create({name});
        res.status(200).json({designation, message: 'Designation Created Successfully'});
    }),
    getDesignationById: catcher(async (req, res) => {
        const {id} = req.params;
        const designation = await Designation.findOne({designationId: id});
        res.status(200).json({designation});
    }),
    updateDesignation: catcher(async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        const designation = await Designation.updateOne({ designationId: id }, { name });
        res.status(200).json({designation, message: 'Designation Updated Successfully'});
    }),


    getBranches: catcher(async (req, res) => {
        const branches = await Branch.find({});
        res.status(200).json({branches});
    }),
    createBranch: catcher(async (req, res) => {
        const {name} =  req.body;
        const branch = await Branch.create({name});
        res.status(200).json({branch, message: 'Branch Created Successfully'});
    }),
    getBranchById: catcher(async (req, res) => {
        const {id} = req.params;
        const branch = await Branch.findOne({branchId: id});
        res.status(200).json({branch});
    }),
    updateBranch: catcher(async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        const branch = await Branch.updateOne({ branchId: id }, { name });
        res.status(200).json({branch, message: 'Branch Updated Successfully'});
    }),

    getCenters: catcher(async (req, res) => {
        const centers = await Center.find({});
        res.status(200).json({centers});
    }),
    createCenter: catcher(async (req, res) => {
        const {name} =  req.body;
        const center = await Center.create({name});
        res.status(200).json({center, message: 'Center Created Successfully'});
    }),
    getCenterById: catcher(async (req, res) => {
        const {id} = req.params;
        const center = await Center.findOne({centerId: id});
        res.status(200).json({center});
    }),
    updateCenter: catcher(async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        const center = await Center.updateOne({ centerId: id }, { name });
        res.status(200).json({center, message: 'Center Updated Successfully'});
    }),
};

export default MasterController;