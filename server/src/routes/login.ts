import {Request, ResponseToolkit} from "@hapi/hapi";
import Joi from "joi";
import {login} from "../controllers/auth.js";
import { config } from "../config/config.js";

type loginPayload = {
    username: string,
    password: string
}

export const loginRoute = {
    method: 'POST',
    path: '/login',
    handler: async function(request: Request, h: ResponseToolkit) {
        const payload = request.payload as loginPayload;
        if(await login(payload.username, payload.password)) {
            request.cookieAuth.set({token: config.mockAccount.token});
            return h.response({username: payload.username, message: 'Welcome Luke !'}).code(200);
        } else {
            return h.response({message: 'Unauthorized to access db.'}).code(403);
        }
    },
    options: {
        auth: false,
        validate: {
            payload: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
            }),
            failAction: async (request: Request, h:ResponseToolkit, err:Error) => {
                throw err;
            }
        }
    }
}