import {config} from "dotenv"
config()

import app from "./framework/config/app"
import { setupSwagger } from "./framework/utils/swagger";


const port=process.env.PORT


// Swagger setup
setupSwagger(app);



app.listen(port,()=>console.log(`server running:http:localhost:${port}`))






