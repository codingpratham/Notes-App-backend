import 'dotenv/config'
import express, { Request, Response } from 'express'
import prisma from './lib/prisma';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/notes', async(req:Request, res:Response) => {
    await prisma.$connect()
    const newNote = await prisma.user.create({
        data: {
            email:"test@test.com",
            password:"test",
            notes:{
                create:{
                    title:"First Note",
                    content:"This is my first note"
                }
            }
        }
    })
    res.json(newNote)
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
})