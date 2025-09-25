import mongoose from 'mongoose';
export function connectToDb(){
   return mongoose.connect(process.env.DB_URL);
}
