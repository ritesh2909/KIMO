import fs from "fs";
import { clearCourses, insertCourses } from "../repositories/course.repository";

export const courseMigrationScript = async () =>{

  try {
    const data = JSON.parse(fs.readFileSync('src/datasources/course.json', 'utf8'));

    console.log(data)
    await clearCourses();
    await insertCourses(data);  
    console.log("Data setup completed successfully !!")
  } catch (error) {
    console.error("Error setting up data:", error);    
  }
}