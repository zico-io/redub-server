import { FastifyInstance } from "fastify"

import { registerUserHandler, loginHandler, getCurrentUserHandler, getUsersHandler } from './user.controller'
import { $ref } from "./user.schema";

const userRoutes = async (server: FastifyInstance) => {

    server.post('/', {
        schema:{
            body: $ref('createUserSchema'),
            response:{
                201: $ref('createUserResponseSchema')
            }
        }
    }, registerUserHandler);

    server.post('/login', {
        schema: {
            body: $ref('loginSchema'),
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, loginHandler)

    server.post('/auth', {
        preHandler: [server.auth],
        schema: {
            body: $ref('authSchema'),
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, getCurrentUserHandler)

    server.get('/', {
        preHandler: [server.auth],
    }, getUsersHandler)

}

export default userRoutes