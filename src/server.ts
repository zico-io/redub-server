import Fastify from "fastify";

import userRoutes from './modules/user/user.route';

import * as dotenv from 'dotenv';
dotenv.config();

const serverPort = process.env.SERVER_PORT;

const server = Fastify({
    logger: true
});

server.get('/healthcheck', async (request, reply) => {
    return {status: 'OK'}
})

const main = async (port = '3000') => {

    server.register(userRoutes, { prefix: 'api/users' });

    try {
        await server.listen({ port: port, host: '0.0.0.0' })
    } catch(e) {
        server.log.error(e)
        process.exit(1)
    }
}

main(serverPort)