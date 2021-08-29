import expressJwt from 'express-jwt';
import { jwtSecret } from '../secret';

export default function jwt() {
    return expressJwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
        ],
    });
}
