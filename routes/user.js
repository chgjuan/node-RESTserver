
import { Router } from "express"
import { validarCampos } from "../middlewares/validar-campos.js"
import { emailValido, esRolValido, existeUsuarioById } from "../helpers/db-validators.js"
import { usuariosDelete, 
    usuariosGet, 
    usuariosPatch, 
    usuariosPost, 
    usuariosPut } from "../controllers/user.js"
import { check } from "express-validator"
import { Role } from "../models/role.js"

export const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 letras').isLength({min: 6}).not().isEmpty(),
    check('correo').custom(emailValido),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost)

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)




// export { router }



