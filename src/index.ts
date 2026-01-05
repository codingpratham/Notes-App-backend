import 'dotenv/config'
import express, { Request, Response } from 'express'
import prisma from './lib/prisma';
import indexRoutes from './routes/index';
import { authMiddleware } from './middleware/auth.middleware';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',indexRoutes);

app.get('/',authMiddleware, (req: Request, res: Response) => {
    console.log(req.userId);

    res.send('Hello World!')
})


app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
})