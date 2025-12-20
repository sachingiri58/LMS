import mongoose from "mongoose";
export const connectDB=async()=>{
  await mongoose.connect('mongodb+srv://sachinggiri01_db_user:nGwZW9ViFRv6cQ69@cluster0.yor3f6g.mongodb.net/Learning_Management_System').then(()=>{console.log('DB Connected')})
}