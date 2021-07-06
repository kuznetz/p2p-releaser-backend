import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import Infoblocks from 'services/infoblocks'
import { Release } from 'models/release'

import { GetParams, GetResult } from './get.types'
import GetSchema from './get.schema.json'
//ts-json-schema-generator --path './src/server/releases/get.types.ts' --type * > ./src/server/releases/get.schema.json

const options: RouteShorthandOptions = {
    schema: {
        summary: 'Получить инфоблок в виде json по id',
        params: GetSchema.definitions.GetParams,
        response: {
            200: GetSchema.definitions.GetResult
        }
    }
};

export default async (server: FastifyInstance ):Promise<void> => {
    server.get<{
        Params: GetParams;
        Reply: GetResult;
    }>('/releases/:id', options, async (request, reply):Promise<GetResult> => {
        let buf = await Infoblocks.get('releases',Buffer.from(request.id,'hex'))
        let release = new Release()
        release.deserialize( buf )
        return {
          id: release.getId(),
          authorId: release.getAuthorId(),
          name: release.name,
          description: release.description,
          tags: release.tags
        }
    });
}