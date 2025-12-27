import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDatabase } from './config/db.js';
dotenv.config({path:'BackEnd/config/config.env'})
connectMongoDatabase();
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})