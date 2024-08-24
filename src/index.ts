import express from 'express';
import { dbSetup } from './config/db.config';
import dotenv from "dotenv";
import cors from "cors";
import { courseMigrationScript } from './scripts/course.script';
import courseRoutes from './routes/course.route';


dotenv.config();

const startServer = async () => {
  try {
    await dbSetup(); 
    courseMigrationScript(); 

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/api', courseRoutes);

    app.listen(process.env.PORT, () => {
      console.log("Server running at port", process.env.PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
