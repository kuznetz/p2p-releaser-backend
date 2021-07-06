import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import Releases from 'services/releases'

import { Querystring, Result } from './tags.types'
import Schema from './tags.schema.json'
//ts-json-schema-generator --path './src/server/releases/tags.types.ts' --type * > ./src/server/releases/tags.schema.json

const options: RouteShorthandOptions = {
    schema: {
        summary: 'Получить теги релизов',
        //querystring: Schema.definitions.Querystring,
        response: {
            200: Schema.definitions.Result
        }
    }
};

export default async (server: FastifyInstance ):Promise<void> => {
    server.get<{
        //Querystring: Querystring;
        Reply: Result;
    }>('/releases/tags', options, async (request, reply):Promise<Result> => {
        let tags = await Releases.getTags()
        return {
            tags: tags.map(t => ({
                id: t._id.toHexString(),
                name: t.name,
                parentId: t.parentId?t.parentId.toHexString():null,
                count: t.count
            }))
        }
    });
}