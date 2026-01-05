import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
interface jwtPayload {
    id: string;
}

declare global {
    namespace Express{
        interface Request {
            userId?: string;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "") as jwtPayload;
        req.userId = decodedToken.id;
        next();
    }catch(error){
        return res.status(401).json({message: "Unauthorized"});
    }
}