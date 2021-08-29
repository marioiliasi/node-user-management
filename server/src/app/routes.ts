import * as core from 'express-serve-static-core';
import userRoutes from './user-routes';

export default (app: core.Express) => {
    userRoutes(app);
    // glob(`${__dirname}/../lib/routes/user-routes.ts`, {}, (er, files) => {
    //     if (er) throw er;
    //     files.forEach(file => {
    //         require(file)(app)
    //     });
    // });
};
