import gameModel from "../models/gameproducts.model.js";
import { error, success } from "../utills/responseWrapper.js";




export async function addGameInList(req,res){
    try {
 
        const {name,playstoreURL} = req.body;

        const uploadedImage = req.files[0];
        const uploadedVideo = req.files[0];
   

        const newGame = new gameModel({
            name,
            playstoreURL,
            image:{
                filename:uploadedImage.filename,
                originalname:uploadedImage.originalname,
                path:uploadedImage.path,
            },
            video:{
                filename:uploadedVideo.filename,
                originalname:uploadedVideo.originalname,
                destination:uploadedVideo.destination,
                path:uploadedVideo.path,
            },
        })
        // console.log(newGame);
        await newGame.save();
        
        return res.send(success(201,"file uploaded successfully!"));        
    } catch (err) {
        return res.send(error(500,err.message));
    }
}


export async function getGameList(req,res){
    try {
        const gameList = await gameModel.find({});
        if(gameList.length==0){
            return res.send(success(204,"empty game list"));
        }
        return res.send(success(200,gameList));
    } catch (err) {
        return res.send(error(500,err.message));
    }
}