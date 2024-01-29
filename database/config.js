
import mongoose from "mongoose"

const dbConnection = async() =>{

    try {
        await mongoose.connect(process.env.MONGODB 
        //     {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }
        )

        console.log('DB Online')
    } catch (error) {
        console.log(error)
        throw new Error('Error en la base de datos')
    }

}


export {dbConnection}