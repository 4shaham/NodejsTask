import express from "express"
import morgan from "morgan"
import {connectDb} from "./db"

// routers 
import authRouter from "../routes/authRoutes"
import errorHandlerMiddleware from "../middleware/errorHandlingMiddleware"
import middleware404 from "../middleware/404ErrorhandlingMiddleware"

const app=express()

app.use(morgan("dev"))  
connectDb()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/auth",authRouter)

app.use(errorHandlerMiddleware)

// app.all("/*",middleware404)


export default app