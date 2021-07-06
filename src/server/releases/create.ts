import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import Releases from 'services/releases'
import Keys from 'services/keys'
import { Release } from 'models/release'

import CreateSchema from './create.schema.json'
import { CreateBody, CreateResult } from './create.types'
//ts-json-schema-generator --path './src/server/releases/create.types.ts' --type * > ./src/server/releases/create.schema.json

const options: RouteShorthandOptions = {
    schema: {
        summary: 'Создать новый блок из json',
        body: CreateSchema.definitions.CreateBody,
        response: {
            200: CreateSchema.definitions.CreateResult,
        }
    },
};

export default async (server: FastifyInstance ):Promise<void> => {
    server.post<{
        Body: CreateBody;
        Reply: CreateResult;
    }>('/releases/create', options, async (request, reply):Promise<CreateResult> => {
        let newRelease = new Release()
        Object.assign(newRelease,request.body)
        let buf = newRelease.makeBlock(Keys.privateKey)
        await Releases.store(buf)
        return { id: newRelease.getId() };
    });
}