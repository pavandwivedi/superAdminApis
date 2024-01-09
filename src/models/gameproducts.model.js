import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    filename:String,
    originalname:String,
    destination:String,
    path:String,
})

const imageSchema = new mongoose.Schema({
    filename:String,
    originalname:String,
    path:String,
})

const gameSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    playstoreURL :{
        type:String,
        required:true
    },
    image: imageSchema,
    video: videoSchema

})

const gameModel = mongoose.model('game',gameSchema);
export default gameModel;