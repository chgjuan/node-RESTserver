
import { response, request } from "express"
import { Usuario } from '../models/usuario.js'
import bcryptjs from "bcryptjs"
import { generarJWT } from "../helpers/generarJWT.js"
import { googleVerify } from "../helpers/google-verify.js"


const login = async (req, res = response) =>{

    const {correo, password } = req.body 

    try {


        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo})
            if(!usuario){
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos'
                })
            }

        //Verificar si está activo
            if(!usuario.estado){
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - estado: False'
                })
            }

        //Verificar la contraseña
            const validPassword = bcryptjs.compareSync( password, usuario.password )
            if(!validPassword){
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - password'
                })
            }
        
        //Generar el JWT
        const token = await generarJWT(usuario.id)
            

        res.json({
            usuario,
            token

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req, res) => {

    const {id_token} = req.body

    try {
        const {correo, nombre, img}= await googleVerify( id_token )
        // console.log(googleUser)

        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            //tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: "USER_ROLE",
                google: true,
            }

            usuario = new Usuario(data)
            await usuario.save()
        }

        //Si el usuario en DB está negado - Estado
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })
    }catch (err){
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}

export { login, googleSignIn}