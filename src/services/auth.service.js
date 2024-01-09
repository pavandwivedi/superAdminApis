import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.ACCESS_SECRET_KEY ;

export function generateJWTToken(data){
    try {
        const token = jwt.sign(data,secretKey,{
            expiresIn:'1w',
        });

        return token;
    } catch (error) {
        return res.send(error(500,error.message));
    }
}