
import { Schema, model } from "mongoose";

const rolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    
})

const Role = model('Role', rolSchema )

export { Role }