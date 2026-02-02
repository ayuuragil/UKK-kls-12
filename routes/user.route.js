import express from 'express'
import { 
    getAllUser,
    getUserById,
    addUser,
    updateUser,
    deleteUser

} from '../controllers/user_controller.js'

import { authenticate, authorize } from '../controllers/auth_controller.js'
import { IsAdmin } from '../middleware/authorize.js'

const app = express()

app.use(express.json())

app.get('/',getAllUser)
app.get('/:id',getUserById)
app.post('/',authorize, IsAdmin, addUser)
app.put('/',authorize, IsAdmin, updateUser)
app.delete('/',authorize, IsAdmin, deleteUser)

app.post('/login',authenticate)

export default app