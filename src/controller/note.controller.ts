import { Request, Response } from "express";
import { noteSchema } from "../schemas/note.schema";
import prisma from "../lib/prisma";

export const createNotes = async (req:Request, res:Response)=>{
    const userId = req.userId
    const notes = noteSchema.safeParse(req.body);
    if(!notes.success){
        return res.status(400).json({message: "all parameters are required"});
    }
    const {title, content} = notes.data;
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId as string
            }
        })

        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        const newNote = await prisma.note.create({
            data:{
                title:notes.data.title,
                content:notes.data.content,
                userId:userId as string,
                check:"pending"
            }
        })
        return res.status(200).json(newNote)

    } catch (error:Error | any) {
        return res.status(500).json({message: error.message});
    }
    
}

export const getAllNotes = async (req:Request, res:Response)=>{
    const userId = req.userId
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId as string
            }
        })

        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        const notes = await prisma.note.findMany({
            where:{
                userId:userId as string
            }
        })

        return res.status(200).json(notes)

    } catch (error:Error | any) {
        return res.status(500).json({message: error.message});
    }
}

export const getSingleNote = async (req:Request, res:Response)=>{
    const userId = req.userId
    const noteId = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId as string
            }
        })

        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        const note = await prisma.note.findUnique({
            where:{
                id:noteId as string
            }
        })

        if(!note){
            return res.status(404).json({message: "note not found"});
        }

        return res.status(200).json(note)
    
    }catch (error:Error | any) {
        return res.status(500).json({message: error.message});
    }
}

export const updateNote = async (req:Request, res:Response)=>{
    const userId = req.userId
    const noteId = req.params.id
    const notes = noteSchema.safeParse(req.body);
    if(!notes.success){
        return res.status(400).json({message: "all parameters are required"});
    }
    const {title, content} = notes.data;
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId as string
            }
        })

        if(!user){
            return res.status(404).json({message: "user not found"});
        }   

        const note = await prisma.note.findUnique({
            where:{
                id:noteId as string
            }
        })

        if(!note){
            return res.status(404).json({message: "note not found"});
        }
        const updatedNote = await prisma.note.update({
            where:{
                id:noteId as string
            },
            data:{
                title:notes.data.title,
                content:notes.data.content
            }
            })
        return res.status(200).json(updatedNote)
        
    } catch (error:Error | any) {
        return res.status(500).json({message: error.message});
    }
}

export const deleteNote = async (req:Request, res:Response)=>{
    const userId = req.userId
    const noteId = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId as string
            }
        })

        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        const note = await prisma.note.findUnique({
            where:{
                id:noteId as string
            }
        })

        if(!note){
            return res.status(404).json({message: "note not found"});
        }
        const deletedNote = await prisma.note.delete({
            where:{
                id:noteId as string
            }
        
            })
        return res.status(200).json(deletedNote)
        
    } catch (error:Error | any) {
        return res.status(500).json({message: error.message});
    }

}

export const updateStatus = async (req:Request, res:Response)=>{
    const userId = req.userId
    const noteId = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId as string
            }
        })

        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        const note = await prisma.note.findUnique({
            where:{
                id:noteId as string
            }
        })

        if(!note){
            return res.status(404).json({message: "note not found"});
        }
        const updatedNote = await prisma.note.update({
            where:{
                id:noteId as string
            },
            data:{
                check:"done"
            }
            })
        return res.status(200).json(updatedNote)
        
    } catch (error:Error | any) {
        return res.status(500).json({message: error.message});
    }
}

export const deleteAllNotes = async (req:Request, res:Response)=>{
    const userId = req.userId
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId as string
            }
        })          

        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        const notes = await prisma.note.findMany({
            where:{
                userId:userId as string
            }
        })
        if(!notes){
            return res.status(404).json({message: "no notes found"});
        }
        const deletedNotes = await prisma.note.deleteMany({
            where:{
                userId:userId as string
            }
        })
        return res.status(200).json(deletedNotes)   
    } catch (error:Error | any) {
        return res.status(500).json({message: error.message});
    }
}