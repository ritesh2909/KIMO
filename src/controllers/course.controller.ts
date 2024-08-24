import { Request, Response } from 'express';
import {
  getAllCourses,
  getCourseById,
  getChapterById,
  addRatingToChapter
} from '../repositories/course.repository';

export const getCourses = async (req: Request, res: Response) => {
  const sort = req.query.sort || 'name';
  const domain = req.query.domain;

  let sortOptions: any = {};
  if (sort === 'date') {
    sortOptions = { date: -1 };
  } else if (sort === 'rating') {
    sortOptions = { rating: -1 };
  } else {
    sortOptions = { name: 1 };
  }

  const filter: any = {};
  if (domain) {
    filter.domain = domain;
  }

  try {
    const courses = await getAllCourses(sortOptions, filter);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) {
      return res.status(400).json({ isSuccess: false, message: "Course not found" });
    }

    return res.status(200).json({
      isSuccess: true,
      data: course
    })
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: "Error fetching course", error });
  }
};

export const getChapter = async (req: Request, res: Response) => {
  try {
    const chapter = await getChapterById(req.params.id, req.params.chapterId);
    if (!chapter) {
      res.status(404).json({ isSuccess: false, message: "Chapter not found" });
    }
    return res.status(200).json({
      isSuccess: true,
      data: chapter
    })
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: "Error fetching chapter", error });
  }
};

export const rateChapter = async (req: Request, res: Response) => {
  const { chapterId, rating } = req.body;
  const courseId = req.params.id;
  try {
    const course = await getCourseById(courseId);
    if (!course) {
      return res.status(404).json({
        isSuccess: false, 
        message: "Course not found"
      })
    }
    
    const updatedChapter = await addRatingToChapter(courseId, chapterId, rating);
    if (updatedChapter) {
      res.status(200).json({ isSuccess: true, message: "Rating added", chapter: updatedChapter });
    } else {
      res.status(404).json({ isSuccess: false, message: "Course or chapter not found" });
    }
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: "Error adding rating", error });
  }
};
