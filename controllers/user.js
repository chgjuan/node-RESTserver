import { response, request } from "express"

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre, id = 'No ID'} = req.query

    res.json({
        ok: true,
        msg: 'get API - Controlador',
        q,
        nombre,
        id
    })
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        // ok: true,
        msg: 'put API - Controlador',
        id
    })
}

const usuariosPost = (req, res) => {

    // const body = req.body;
    const {nombre, edad} = req.body;


    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete API - Contralador'
    })
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