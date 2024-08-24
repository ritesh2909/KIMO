import { Course } from '../models/course.model';

export const clearCourses = async () => {
    await Course.deleteMany({});
};

export const insertCourses = async (data: any[]) => {
    await Course.insertMany(data);
};

export const getAllCourses = async (sortOptions: any, filter: any) => {
    return await Course.find(filter).sort(sortOptions);
};

export const getCourseById = async (id: string) => {
    return await Course.findById(id);
};

export const getChapterById = async (courseId: string, chapterId: string) => {
    return await Course.findOne(
        { _id: courseId, 'chapters._id': chapterId },
        { 'chapters.$': 1 }
    );
};

export const addRatingToChapter = async (courseId: string, chapterId: string, rating: number) => {
    const course = await Course.findOne({ _id: courseId });
    if (!course) return null;

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return null;

    chapter.rating = chapter.rating || [];
    chapter.rating.push(rating);

    await course.save();
    return chapter;
};
