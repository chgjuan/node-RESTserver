import { response, request } from "express"
import { Usuario } from "../models/usuario.js"
import bcryptjs from "bcryptjs"


const usuariosGet = async(req = request, res = response) => {
    
    // const { q, nombre, id = 'No ID'} = req.query
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query)

    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        // ok: true,
        // msg: 'get API - Controlador',
        // q,
        // nombre,
        // id
        // total,
        // usuarios
        total,
        usuarios
    })
}

const usuariosPut = async(req, res) => {

    const id = req.params.id
    const { _id, password, google, correo, ...resto } = req.body
    
    //Validar contra base de datos
    if( password ){
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(
        // ok: true,
        // msg: 'put API - Controlador',
        usuario
    )
}

const usuariosPost = async(req, res) => {

    //HAY QUE OPTIMIZAR EL CÓDIGO CUANDO SE COPIE Y PEGUE
    // const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors)
    // }

    // const {nombre, edad} = req.body;
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //VERIFICAR SI EL CORREO EXISTE
    // const emailExiste = await Usuario.findOne({correo});
    // if(emailExiste){
    //    return res.status(400).json({
    //     msg: 'Este correo ya se está usando'
    //    }) 
    // }

    //ENCRIPTAR LA CONTRASEÑA
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //GUARDAR EN BASE DE DATOS
    await usuario.save()

    res.json(
        // msg: 'post API - Controlador',
        usuario
    )
}

const usuariosDelete = async(req, res) => {

    const {id} = req.params

    const uid = req.uid

    //FISICAMENTE LO BORRAMOS
    // const usuario = await Usuario.findByIdAndDelete(id)

    //CAMBIAR MEJOR EL ESTADO DEL USUARIO POR SI HA HECHO MODIFICACIONES
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    // const usuarioAutenticado = req.usuario

    res.json({usuario})
}

const usuariosPatch = (req, res) => {
    res.json({
        ok: true,
        msg: 'patch API - Controlador'
    })
}


export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}