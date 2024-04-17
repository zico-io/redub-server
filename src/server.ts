import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config())

import Fastify, { FastifyReply, FastifyRequest } from "fastify";

import { userSchemas } from './modules/user/user.schema';
import userRoutes from './modules/user/user.route';
import { FastifyJwtNamespace } from '@fastify/jwt';

const port: string = process.env.SERVER_PORT || '3000'

declare module "fastify" {
    export interface FastifyInstance {
        auth: any;
    }
    interface FastifyInstance extends FastifyJwtNamespace<{namespace: 'security'}> {}
}

export const server = Fastify({
    logger: true
});

server.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET
})

server.decorate('auth', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    }catch(e){
        return reply.send(e)
    }
})

server.get('/healthcheck', async (request, reply) => {
    return {status: 'OK'}
})

const main = async (port: string) => {

    for(const schema of userSchemas) {
        server.addSchema(schema)
    }

    server.register(userRoutes, { prefix: 'api/users' });

    try {
        await server.listen({ port: parseInt(port), host: '0.0.0.0' })
    } catch(e) {
        server.log.error(e)
        process.exit(1)
    }
}

main(port)