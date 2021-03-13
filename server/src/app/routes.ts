import glob from 'glob';
import * as core from "express-serve-static-core";

export default (app: core.Express) => {
    glob(`${__dirname}/../routes/**/*Routes.js`, {}, (er, files) => {
        if (er) throw er;
        files.forEach((file) => require(file)(app));
    });
};
