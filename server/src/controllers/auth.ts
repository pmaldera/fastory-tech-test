import { Request } from '@hapi/hapi';
import bcrypt from 'bcrypt';
import { config } from '../config/config.js';

type Session = {
    token: string
}

export async function login(username:string, password:string) {
    if(username === config.mockAccount.username) { // In a real life project there should be a db call here.
        return await bcrypt.compare(password, config.mockAccount.password);
    }
}

export function checkSession(request: Request, session: Session) {
    if(session.token) {
        return { 
            valid: config.mockAccount.token === session.token // In a real life project there should be a db call here.
        };
    } else {
        return { 
            valid: false
        };
    }
}