import CourseCriteria from "../models/CourseCriteriaModel.js";import Course from "../models/CourseModel.js";
import Notification from "../models/NotificationModel.js";
import User from "../models/UserModel.js";
;

const CourseCriteriaRepo = {
    async getCourseCriteria(courseId) {
        return await CourseCriteria.find({ courseId });
    },
    async createCourseCriteria(courseCriteria) {
        let courseIds = courseCriteria.courseIds;
        delete courseCriteria.courseIds;
        let courses = await Course.find({courseId: {$in: courseIds}})
        const bulkOps = courseIds.map(courseId => {
            let courseCriteriaId = Math.floor(Math.random() * Date.now())
            return {
              updateOne: {
                filter: { courseId },
                update: { $set: {...courseCriteria.criteria, courseCriteriaId} },
                upsert: true,
              },
            };
          });   

        let cc = await CourseCriteria.bulkWrite(bulkOps);
        let critera = [];
        courseCriteria = {...courseCriteria.criteria}
        if(!courseCriteria.userRole.includes("*")) {
            critera.push({role: courseCriteria.userRole[0] === "client" ? "customer" : "employee"});
        }
        if((!courseCriteria.center.includes("*")) && courseCriteria.center.length > 0) {
            critera.push({centerId: {$in: courseCriteria.center}});
        }
        if((!courseCriteria.group.includes("*")) && courseCriteria.group.length > 0) {
            critera.push({groupId: {$in: courseCriteria.group}});
        }
        if((!courseCriteria.location.includes("*")) && courseCriteria.location.length > 0) {
            critera.push({locationId: {$in: courseCriteria.location}});
        }
        if((!courseCriteria.department.includes("*")) && courseCriteria.department.length > 0) {
            critera.push({departmentId: {$in: courseCriteria.department}});
        }
        if((!courseCriteria.designation.includes("*")) && courseCriteria.designation.length > 0) {
            critera.push({designationId: {$in: courseCriteria.designation}});
        }
        if((!courseCriteria.branch.includes("*")) && courseCriteria.branch.length > 0) {
            critera.push({branchId: {$in: courseCriteria.branch}});
        }
        const users = await User.aggregate([
            {
            $lookup: {
            from: "enrollments",
            localField: "userId",
            foreignField: "student",
            as: "enrollment"
            }
            },
            {
            $match: {
            $and: [
            ...critera,
            {isActive: true},
            ]
            }
            },
            {
            $project: {
            _id: 0,
            userId: 1,
            firstName: 1,
            lastName: 1,
            name: 1,
            email: 1,
            phone: 1,
            }
            }
        ]);
        const notificationBulkOps = [];
        for(let i=0; i<courses.length; i++) {
            for(let j=0; j<users.length; j++) {
                notificationBulkOps.push({
                    title: "Admin allocated a new course for you",
                    image: courses[i].image,
                    description: "View the allotted course for you and start to learn",
                    type: "new-course",
                    landing: "/Pages/Course",
                    landingData: JSON.stringify({id: courses[i].courseId}),
                    availableAt: courses[i].startDate,
                    expireAt: new Date(courses[i].startDate.getTime() + 5 * 24 * 60 * 60 * 1000), // start date + 5 days
                    userId: users[j].userId
                })
            }
        }
        Notification.create(notificationBulkOps);
        return cc;
    },
    async updateCourseCriteria(id, courseCriteria) {
        return await CourseCriteria.findByIdAndUpdate(id, courseCriteria, { new: true });
    },
    async deleteCourseCriteria(id) {
        return await CourseCriteria.findByIdAndDelete(id);
    },
    async deleteCourseCriteriaByCourseId(courseId) {
        return await CourseCriteria.deleteMany({ courseId });
    }
}

export default CourseCriteriaRepo;