import express from "express"
import morgan from "morgan"
import {connectDb} from "./db"

// routers 
import authRouter from "../routes/authRoutes"

const app=express()

app.use(morgan("dev"))  
connectDb()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/api/auth",authRouter)



export default app