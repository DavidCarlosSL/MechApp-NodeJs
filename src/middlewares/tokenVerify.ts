import jwt from 'jsonwebtoken';
import { jwtPrivateKey } from '../config/custom-environment-variables.json';

export function tokenVerify (req: any, res: any, next: any) {
    const token = req.header('x-access-token');
    if(!token)
        return res.status(401).send({
            tokenProvided: false,
            validToken: false,
            message: "Access denied. No Token provided"
        });
        
    try{
        const tokenDecoded = jwt.verify(token, jwtPrivateKey);
        req.person = tokenDecoded;
        next();
    }catch(err) {
        res.status(400).send({
            tokenProvided: true,
            validToken: false,
            message: "Invalid Token"
        })
    }
}