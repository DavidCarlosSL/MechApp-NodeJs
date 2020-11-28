import { Request } from 'express';

export interface IRequest extends Request {
    person: {
        mechanicalId?: number,
        clientId?: number
    }
}