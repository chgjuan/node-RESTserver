import { Router } from "express"
import { check } from "express-validator"
import { googleSignIn, login } from "../controllers/auth.js"
import { validarCampos } from "../middlewares/validar-campos.js"

export const routerLogin = Router()

routerLogin.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login)

routerLogin.post('/google', [
    check('id_token', 'Token de Google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn)
