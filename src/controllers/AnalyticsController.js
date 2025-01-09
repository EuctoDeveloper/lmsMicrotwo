import Course from "../models/CourseModel.js";
import User from "../models/UserModel.js";
import catcher from "../utils/catcher.js";



const AnalyticsController = {
    getAnalytics: catcher(async (req, res) => {
        const customerCount = await User.countDocuments({ role: 'customer' });
        const employeeCount = await User.countDocuments({ role: 'employee' });
        const courseCount = await Course.countDocuments();
        const customerActiveCount = await User.countDocuments({ role: 'customer', isActive: true });
        const employeeActiveCount = await User.countDocuments({ role: 'employee', isActive: true });
        const courseActiveCount = await Course.countDocuments({startDate: { $lt: new Date() }, isActive: true});

        res.json({
            customerCount,
            employeeCount,
            courseCount,
            customerActiveCount,
            employeeActiveCount,
            courseActiveCount
        });
    }),
}

export default AnalyticsController