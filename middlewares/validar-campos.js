import { validationResult } from "express-validator"
import { response, request } from "express"

const validarCampos = (req, res, next) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next()
}

export { validarCampos }