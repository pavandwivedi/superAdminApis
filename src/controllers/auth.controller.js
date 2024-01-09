import { error, success } from "../utills/responseWrapper.js";
import bcrypt from 'bcrypt';
import adminModel from "../models/admin.model.js";
import { generateJWTToken } from "../services/auth.service.js";

export async function signupController(req,res){
    try {
   
        const {username,password,email} = req.body;
        
        if(!username || !password || !email){
            return res.send(error(403,"all fields are required!"));
        }
        const isUsernameExist = await adminModel.findOne({username});
        if(isUsernameExist){
            return res.send(error(409 ,"username already exist"));
        }
        const isEmailExist = await adminModel.findOne({email});  
        if(isEmailExist){
            return res.send(error(409,"email already exist"));
        }      
        const hashedPassword = await bcrypt.hash(password,12);
        req.body["password"] = hashedPassword;
        const user = await adminModel.create(req.body);
        return res.send(success(201,user));
    } catch (err) {
        return res.send(error(500,err.message));
    }
}

export async function loginController(req,res){
    try {
        const {usernameOrEmail,password} = req.body;
        const user = await adminModel.findOne({
            $or:[{username:usernameOrEmail}, {email:usernameOrEmail}]
        });
        if(!user){
            return res.send(error(404,"user not found"));
        }

        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            return res.send(error(401,"incorrect password"));
        }

        const jwtToken = generateJWTToken({...user});
        return res.send(success(200,{jwtToken,username:user.username}));

    } catch (err) {
        return res.send(error(500,err.message))
    }
}