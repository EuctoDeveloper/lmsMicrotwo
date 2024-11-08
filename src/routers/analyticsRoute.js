import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import AnalyticsController from '../controllers/AnalyticsController.js';



const analyticsRouter = express.Router();

analyticsRouter.get('/', verifyToken, AnalyticsController.getAnalytics);


export default analyticsRouter;