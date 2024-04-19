import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import bcrypt from 'bcryptjs';
import { server } from "../../server";

export const registerUserHandler = async (request: FastifyRequest<{Body: CreateUserInput}>, reply: FastifyReply) => {
    const body = request.body
    try{
        const user = await createUser(body)

        return reply.code(201).send(user)
    }catch(e) {
        console.log(e)
        return reply.code(500).send(e)
    }
}

export const loginHandler = async (request: FastifyRequest<{
    Body: LoginInput;
}>, reply: FastifyReply) => {
    const body = request.body

    const user = await findUserByEmail(body.email)

    if(!user) {
        return reply.code(401).send({
            message: 'Invalid email or password',
        })
    }

    const match = await bcrypt.compare(body.password, user.password)

    if(match) {
        const { password, ...rest } = user
        return { accessToken: server.jwt.sign(rest) }
    }

    return reply.code(401).send({
        message: 'Invalid email or password',
    })
}

export const getUsersHandler = async () => {
    const users = await findUsers()

    return users;
}