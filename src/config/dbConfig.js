import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const dbURL = process.env.DB_URL ||  'mongodb://127.0.0.1:27017/superADMIN';

console.log(dbURL);
export async function connectDB(){
    await mongoose.connect(dbURL);
    console.log("db connected!")
}