import * as dotenv from 'dotenv';
dotenv.config();

const serverPort = process.env.SERVER_PORT;

import Fastify from "fastify";

const server = Fastify({
    logger: true
});

server.get('/healthcheck', async (request, reply) => {
    return {status: 'OK'}
})

const main = async (port = '3000') => {
    try {
        await server.listen({ port: port, host: '0.0.0.0' })
    } catch(e) {
        server.log.error(e)
        process.exit(1)
    }
}

main(serverPort)