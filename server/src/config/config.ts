export const config = {
    serverSettings: {
        port: process.env.PORT || 4000,
        host: process.env.host || "localhost"
    },
    front: {
        appPort: process.env.appPort || 3000 // local app server port
    },
    api: {
        remoteAPIUrl: process.env.remoteAPIUrl || "https://swapi.py4e.com/api",
    },
    auth: {
        cookie: {
            name: process.env.authCookieName || "token",
            password: process.env.authCookiePassword || "!Agzeriahjfiz9898afezzeaPda$!!ada!dzetDGERGZGHEGHHmKFzkzfzrj>EDFEIGzeafQF!",
            isSecure: process.env.hasTLS || "false",
            isHttpOnly: true,
        }
    },
    mockAccount: { // mock acount because not db
        username: 'Luke',
        password: '$2a$12$HYpr4iZvxbntHPG5B0ZyZuwQ/rkOEEAKL.il8rtbEuNLjYzCrXtgS',
        token: '$kgbjahfhzeIUFejadayazfKL9'
    }
}