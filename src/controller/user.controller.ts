import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { Login, Register } from "../schemas/user.schema";
import jwt from "jsonwebtoken";
import { log } from "node:console";
import bcrypt from "bcrypt";

export const register =async (req:Request, res:Response):Promise<void>=>{
    const register  = Register.safeParse(req.body);
    console.log(register)

    if(!register.success){
    res.status(400).send({message:"invalid data"});
    return;
    }
    const {name,email,password} = register.data;
    try {
        const existingUser = await prisma.user.findUnique({
            where:{
                email: email
            }
        })

        if(existingUser){
            res.status(400).send({message:"User already exists"});
            return;
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword
            }
        })
        const token = jwt.sign({
            id:newUser.id
        },process.env.JWT_SECRET as string,{
            expiresIn:'1h'
        })

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            maxAge:3600000
        }).send({
            message:"User registered successfully", user:newUser, token:token
        })
    } catch (error) {
        log(error);
        res.status(400).send({message:"Invalid request"});
    }
}



export const login =async (req:Request, res:Response):Promise<void>=>{
    const login = Login.safeParse(req.body)

    if(!login.success){
    res.status(400).send({message:"Invalid request"});
    return;
    }

    try {
        const existingUser =  await prisma.user.findUnique({
            where:{
                email:login.data?.email
            }
        })
        if (!existingUser) {
            res.status(401).send({ message: "Invalid credentials" });
            return;
        }
        const isPasswordMatch =  await bcrypt.compare(login.data?.password,existingUser.password)
        if(!isPasswordMatch){
            res.status(401).send({message:"Invalid credentials"});
            return;
        }

        const token = jwt.sign({
            id:existingUser.id
        },process.env.JWT_SECRET as string,{
            expiresIn:'1h'
        })

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            maxAge:3600000
        }).send({
            message:"User logged in successfully", user:existingUser, token:token
        })
    } catch (error) {
        res.status(401).send({message:"Invalid credentials"});
    }
}

export const logout = async (req:Request, res:Response):Promise<void>=>{
    res.clearCookie('token');
    res.send({message:"User logged out successfully"});

}