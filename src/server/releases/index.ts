import { FastifyInstance } from 'fastify';
import fastifyGet from './get';
import fastifyCreate from './create';
import fastifyList from './list';
import fastifyTags from './tags';

export default async (server: FastifyInstance ):Promise<void> => {
    await server.register(fastifyGet)
    await server.register(fastifyCreate)
    await server.register(fastifyList)
    await server.register(fastifyTags)    
}