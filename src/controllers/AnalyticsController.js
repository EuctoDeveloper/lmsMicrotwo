import Course from "../models/CourseModel.js";
import User from "../models/UserModel.js";
import catcher from "../utils/catcher.js";



const AnalyticsController = {
    getAnalytics: catcher(async (req, res) => {
        const customerCount = await User.countDocuments({ role: 'customer' });
        const employeeCount = await User.countDocuments({ role: 'employee' });
        const courseCount = await Course.countDocuments();

        res.json({
            customerCount,
            employeeCount,
            courseCount
        });
    }),
}

export default AnalyticsController