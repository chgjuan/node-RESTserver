import express from 'express'
import cors from 'cors'
import {router} from '../routes/user.js';
import { dbConnection } from '../database/config.js';

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'


        //CONN BASES DE DATOS
        this.connectDB()

        //MIDDLEWARES
        this.middlewares()

        //RUTAS DE MI APP
        this.routes()

        

    }

    async connectDB(){
        await dbConnection()
    }

    middlewares(){
        
        //CORS
        this.app.use(cors())

        //Lectur y parseo del body
        this.app.use( express.json())

        //Directorio publico
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, router )
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto',this.port)
        })
    }

}


export { Server } 