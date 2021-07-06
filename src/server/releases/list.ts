import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import Releases from 'services/releases'

import { Querystring, Result } from './list.types'
import Schema from './list.schema.json'
//ts-json-schema-generator --path './src/server/releases/list.types.ts' --type * > ./src/server/releases/list.schema.json

const options: RouteShorthandOptions = {
    schema: {
        summary: 'Получить список id по параметрам',
        querystring: Schema.definitions.Querystring,
        response: {
            200: Schema.definitions.Result
        }
    }
};

export default async (server: FastifyInstance ):Promise<void> => {
    server.get<{
        Querystring: Querystring;
        Reply: Result;
    }>('/releases/list', options, async (request, reply):Promise<Result> => {

        let binAuthor: Buffer
        if (request.query.authorId) {
          binAuthor = Buffer.from(request.query.authorId,'base64')
        }
        let result = await Releases.list(binAuthor,request.query.tag)
        return {
            ids: result.map<string>( id => id.buffer.toString('hex') )
        }
        
    });
}