import {config} from "dotenv"
config()

import app from "./framework/config/app"


const port=process.env.PORT




app.listen(port,()=>console.log(`server running:http:localhost:${port}`))






