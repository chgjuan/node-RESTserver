
import { Router } from "express"
import { usuariosDelete, 
    usuariosGet, 
    usuariosPatch, 
    usuariosPost, 
    usuariosPut } from "../controllers/user.js"

export const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)




// export { router }



