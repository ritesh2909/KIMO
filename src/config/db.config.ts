import mongoose from "mongoose"

export const dbSetup = async () =>{
  try {
    const mongoString: string = process.env.MONGO_URI as string;
    if (!mongoString) {
      throw new Error('Mongo uri not found');
    }
    await mongoose.connect(mongoString)
    console.log("DB Connected successfully !!")
  } catch (error) {
    console.log("Error connecting DB !!, ",error)
  }
}