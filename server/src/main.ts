'use strict';

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import {searchRoute} from "./routes/search.js";
import {config} from "./config/config.js";
import {checkSession} from "./controllers/auth.js";
import Cookie from "@hapi/cookie";
import { loginRoute } from "./routes/login.js";
import { entityRoute } from "./routes/entity.js";

async function initServer(): Promise<Server> {
    let server:Server = Hapi.server(
        config.serverSettings
    );
    await server.register(Cookie);
    server.auth.strategy('session', 'cookie', {
        cookie: config.auth.cookie,
        validateFunc: checkSession
    })
    server.auth.default('session');

    // TS is giving me a hard time about route option because I'm not giving every value for each sub-part.
    //@ts-ignore
    server.route(loginRoute);
    //@ts-ignore
    server.route(entityRoute)
    //@ts-ignore
    server.route(searchRoute);

    return server;
};

async function startServer(server:Server): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    console.log(`Remote API is ${config.api.remoteAPIUrl}`);
    return server.start();
};

process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});

initServer().then((server) => startServer(server));