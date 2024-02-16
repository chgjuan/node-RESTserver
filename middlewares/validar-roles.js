const esAdmin = (req, res, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
    }

    const { rol, nombre } = req.usuario
    
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }

    next()
}

const tieneRol = ( ...role) => {
    return (req, res, next) => {
        
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            })
        }

        if( !role.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${role}`
            })
        }

        next()
    }
}

export { esAdmin, tieneRol }