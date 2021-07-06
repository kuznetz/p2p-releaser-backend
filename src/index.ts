import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import fastifyCors from 'fastify-cors'

import { Config, LoadConfig }  from './config'
import Releases from './server/releases'
import Swagger from './server/swagger';

async function start() {

    await LoadConfig()

    // Create an http server. We pass the relevant typings for our http version used.
    // By passing types we get correctly typed access to the underlying http objects in routes.
    // If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
    const server: FastifyInstance< Server, IncomingMessage, ServerResponse> 
        = fastify({ logger: true });

    await server.register(fastifyCors,{})
    await Swagger(server)
    await server.register(Releases)
    server.swagger()

    let what = await server.listen(3000);
    console.log('Server listening '+what+' ...')
}

start().catch( e => {
    console.error('Start Error',e)
})