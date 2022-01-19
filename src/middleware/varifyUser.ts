import { NextFunction, Request, Response } from 'express'; 
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv'; 



dotenv.config();

  
    const secret = process.env.TOKEN_SECRET as Secret
    const varifyUser = async (  req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization as string;

    if(authorizationHeader){
    const token = authorizationHeader?.split(' ')[1]; 
     jwt.verify(token, secret); return next(); 
    }else{
        return res.status(400).json()
    }
 }

 export default varifyUser