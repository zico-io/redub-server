import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config())

import Fastify from "fastify";

import { userSchemas } from './modules/user/user.schema';
import userRoutes from './modules/user/user.route';

const serverPort = process.env.SERVER_PORT;

const server = Fastify({
    logger: true
});

server.get('/healthcheck', async (request, reply) => {
    return {status: 'OK'}
})

const main = async (port = '3000') => {

    for(const schema of userSchemas) {
        server.addSchema(schema)
    }

    server.register(userRoutes, { prefix: 'api/users' });

    try {
        await server.listen({ port: port, host: '0.0.0.0' })
    } catch(e) {
        server.log.error(e)
        process.exit(1)
    }
}

main(serverPort)