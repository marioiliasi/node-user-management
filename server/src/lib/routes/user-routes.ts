import * as core from "express-serve-static-core";
import { Routes } from '@lib';
import { UserController } from "@user/v1/user/user-controller";
const router = require('express').Router();

const controller: UserController = new UserController();
export default (app: core.Express) => {
    router.route('/')
        .post(
            controller.test
        );
    app.use(
        Routes.USER,
        router,
    );
}
