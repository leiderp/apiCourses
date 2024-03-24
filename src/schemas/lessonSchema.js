const zod = require('zod');

const lessonSchema = zod.object({
    title: zod.string({
        invalid_type_error: 'title must be a string',
        required_error: 'title is required'
    }),
    description: zod.string().optional(),
    linkVideo: zod.string().url({
        message: 'linkVideo must be a valid URL'
    }),
    courseId: zod.string().uuid({ message: "Invalid UUID" }).optional(),
    createdAt: zod.date().optional(),
    updatedAt:zod.date().optional()
});

const validateLesson = (object) =>{
    return lessonSchema.safeParse(object);
};

module.exports = {
    validateLesson,
};