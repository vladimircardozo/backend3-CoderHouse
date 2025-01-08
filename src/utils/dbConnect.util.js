import { connect } from 'mongoose';

async function dbConnect() {
    try{
        connect(process.env.MONGODB_URI);
        console.log("Base de datos conectada 🔥")
    } catch (error){
        console.error("Error a conectar la base de datos" + error);
    }
    
}

export default dbConnect;