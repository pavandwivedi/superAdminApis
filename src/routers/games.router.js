import express from 'express';
import { addGameInList, getGameList } from '../controllers/game.controller.js';
import upload from '../middlewares/upload.js';

const gameRouter = express();


// gameRouter.post('/addgame', upload.array(["files","kuldeep"]),addGameInList);
// gameRouter.post('/addgame',upload.array(['uploadedImage','uploadedVideo']),addGameInList);
gameRouter.post('/addgame' ,upload.array('files'),addGameInList);
gameRouter.get('/getList',getGameList);

export default gameRouter;