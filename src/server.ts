import {config} from "dotenv"
config()

import app from "./framework/config/app"
import { setupSwagger } from "./framework/utils/swagger";


const port=process.env.PORT


// Swagger setup
setupSwagger(app);

// Catch-all route for 404 errors
app.all('*', (req, res) => {
    res.status(404).send({
      error: 'Not Found',
      message: `The requested URL ${req.originalUrl} was not found on this server.`,
    });
});




app.listen(port,()=>console.log(`server running:http:localhost:${port}`))






