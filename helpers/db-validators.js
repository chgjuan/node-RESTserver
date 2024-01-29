import { Role } from "../models/role.js"
import {Usuario} from "../models/usuario.js"

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la DB`)
    }
}

const emailValido = async ( correo = '' ) =>{
    const emailExiste = await Usuario.findOne({correo});
    if(emailExiste){
        throw new Error(`El ${correo} ya está registrado`)
    }
}

const existeUsuarioById = async (id = '') =>{
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El ${id} no existe`)
    }
}




export {esRolValido, emailValido, existeUsuarioById}