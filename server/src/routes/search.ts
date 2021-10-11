import fetch from "node-fetch";
import {Request, ResponseToolkit} from "@hapi/hapi";
import Joi from "joi";
import {searchEntityFromRemoteAPI, replaceURLs} from "../helpers/request.js";
import {ENTITIES_NAMES} from "../enums/entities.js";
import { IEntitySearchResults } from "../models/Entity.js";

export const searchRoute = {
    method: 'GET',
    path: '/search',
    handler: async function(request: Request, h: ResponseToolkit) {
        let data = {};
        //
        if(request.query.filter) { // Either we have an entity as a filter and we use it ...
            const entityResults = await searchEntityFromRemoteAPI(request.query.filter, request.query.query, request.query.page)
            Object.assign(
                data,
                {
                    [request.query.filter]: replaceURLs(entityResults)
                }
            )
        } else {
            for (const entityName of ENTITIES_NAMES) { // .. or we don't and we execute the search on every entity possible.
                const entityResults = await searchEntityFromRemoteAPI(entityName, request.query.query, request.query.page);
                Object.assign(
                    data,
                    {
                        [entityName]: replaceURLs(entityResults)
                    }
                )
            }
        }
        return h.response(data).code(200);
    },
    options: {
        cache: {
            expiresIn: 3600 * 1000, // one hour cache lifespan
            privacy: 'private',
        },
        validate: {
            query: Joi.object({
                query: Joi.string().allow(''),
                filter: Joi.valid(...ENTITIES_NAMES).optional(),
                page: Joi.number().min(1).optional()
            }).options({
                stripUnknown: true
            }),
        }
    }
}