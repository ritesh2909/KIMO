import { Router } from 'express';
import {
    getCourses,
    getCourse,
    getChapter,
    rateChapter
} from '../controllers/course.controller';

const router = Router();

router.get('/courses', getCourses);
router.get('/course/:id', getCourse); 
router.get('/course/:id/chapter/:chapterId', getChapter); 
router.post('/course/:id/rate', rateChapter);

export default router;
