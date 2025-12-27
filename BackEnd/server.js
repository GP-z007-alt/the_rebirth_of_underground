import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDatabase } from './config/db.js';
dotenv.config({path:'BackEnd/config/config.env'})
connectMongoDatabase();
const port = process.env.PORT || 3000;

const server = app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    })
})