import { FastifyInstance } from 'fastify';
import { fastifySwagger } from 'fastify-swagger'

export default async (fastify: FastifyInstance):Promise<void> => {
    await fastify.register( fastifySwagger, {
        mode: 'dynamic',
        routePrefix: '/openapi',
        openapi: {
            info: {
              title: 'Releaser',
              version: '0.1.0'
            }
        },
        exposeRoute: true
    } );
}