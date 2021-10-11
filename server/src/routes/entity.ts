import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { getEntityFromRemoteAPI } from "../helpers/request.js";
import { ENTITIES_NAMES } from "../enums/entities.js";

export const entityRoute = {
    method: 'GET',
    path: '/{entityName}/{entityId}',
    handler: async function(request: Request, h: ResponseToolkit) {
        const data = await getEntityFromRemoteAPI(request.params.entityName, request.params.entityId);
        return h.response(data).code(200);
    },
    options: {
        cache: {
            expiresIn: 3600 * 1000, // one hour cache lifespan
            privacy: 'private',
        },
        validate: {
            params: Joi.object({
                // Unknown entity name are forbidden
                entityName: Joi.valid(...ENTITIES_NAMES).required(),
                entityId: Joi.number().min(1)
            }).options({
                stripUnknown: true
            }),
        }
    }
}