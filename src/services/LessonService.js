import { isValidMimeType } from "../helpers/helper.js";
import LessonRepo from "../repositories/LessonRepo.js";
import CustomError from "../utils/CustomError.js";
import uploadFileToS3 from "../utils/saveFile.js";

const LessonService = {
    getLesson: async (id) => {
        return await LessonRepo.getLessonById(id);
    },
    createLesson: async (lesson, files) => {
        let source , thumbnail = null;
        if (lesson.type === 'video') {
            if (!files.source || !files.source[0]) {
                throw new CustomError('Attachment File is required for video lessons.', 400);
            }
            if (!files.thumbnail || !files.thumbnail[0]) {
                throw new CustomError('Thumbnail File is required for video lessons.', 400);
            }
            if (!isValidMimeType(files.source[0], 'video/mp4')) {
                throw new CustomError('Invalid Video file type. Only mp4 files are allowed.', 400);
            }
            if (!isValidMimeType(files.thumbnail[0], 'image/jpeg') && !isValidMimeType(files.thumbnail[0], 'image/png')) {
                throw new CustomError('Invalid thumbnail file type. Only jpg, jpeg and png files are allowed.', 400);
            }
            source = (await uploadFileToS3(files.source[0], 'lesson-videos'))['Location'];
            thumbnail = (await uploadFileToS3(files.thumbnail[0], 'lesson-thumbnails')).Location;
        } else {
            if (!files.source[0]) {
            throw new CustomError('Attachment file is required for creating a lesson.', 400);
            }
            if (
                !isValidMimeType(files.source[0], 'application/pdf') && 
                !isValidMimeType(files.source[0], 'application/msword') && 
                !isValidMimeType(files.source[0], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && 
                !isValidMimeType(files.source[0], 'text/plain') && !isValidMimeType(files.source[0], 'application/vnd.ms-powerpoint') && 
                !isValidMimeType(files.source[0], 'application/vnd.openxmlformats-officedocument.presentationml.presentation') && 
                !isValidMimeType(files.source[0], 'application/vnd.ms-excel') && 
                !isValidMimeType(files.source[0], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') &&
                !isValidMimeType(files.source[0], 'image/jpeg') && !isValidMimeType(files.source[0], 'image/png')
            ) {
                throw new CustomError('Invalid source file type. Only pdf, doc, docx, txt, ppt, pptx, xls, xlsx, jpg, jpeg and png files are allowed.', 400);
            }
            source = (await uploadFileToS3(files.source[0], 'lesson-attachments'))['Location'];
        }
        return await LessonRepo.createLesson({...lesson, source, thumbnail});
    },
    getLessonsByModuleId: async (moduleId) => {
        return await LessonRepo.getLessonsByModuleId(moduleId);
    },
    updateLesson: async (id, lesson, files) => {
        if (lesson.type === 'video') {
            if (files.source && files.source[0]) {
                if (!isValidMimeType(files.source[0], 'video/mp4')) {
                    throw new CustomError('Invalid source file type. Only video/mp4 files are allowed.', 400);
                }
                lesson.source = (await uploadFileToS3(files.source[0], 'lesson-videos'))['Location'];
            } if (files.thumbnail && files.thumbnail[0]) {
                if (!isValidMimeType(files.thumbnail[0], 'image/jpeg') && !isValidMimeType(files.thumbnail[0], 'image/png')) {
                    throw new CustomError('Invalid thumbnail file type. Only jpg, jpeg and png files are allowed.', 400);
                }
                lesson.thumbnail = (await uploadFileToS3(files.thumbnail[0], 'lesson-thumbnails')).Location;
            }
        } else {
            if (files.source && files.source[0]) {
                if (
                    !isValidMimeType(files.source[0], 'application/pdf') && 
                    !isValidMimeType(files.source[0], 'application/msword') && 
                    !isValidMimeType(files.source[0], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && 
                    !isValidMimeType(files.source[0], 'text/plain') && !isValidMimeType(files.source[0], 'application/vnd.ms-powerpoint') && 
                    !isValidMimeType(files.source[0], 'application/vnd.openxmlformats-officedocument.presentationml.presentation') && 
                    !isValidMimeType(files.source[0], 'application/vnd.ms-excel') && 
                    !isValidMimeType(files.source[0], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') &&
                    !isValidMimeType(files.source[0], 'image/jpeg') && !isValidMimeType(files.source[0], 'image/png')
                ) {
                    throw new CustomError('Invalid source file type. Only pdf, doc, docx, txt, ppt, pptx, xls, xlsx, jpg, jpeg and png files are allowed.', 400);
                }
                lesson.source = (await uploadFileToS3(files.source[0], 'lesson-attachments'))['Location'];
            }
        }
        return await LessonRepo.updateLesson(id, lesson);
    },
    deactivateLesson: async (id) => {
        return await LessonRepo.deactivateLesson(id);
    }
};
 export default LessonService;