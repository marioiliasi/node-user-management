import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';
import { UserController } from '../services/v1/user';
import { ClientError, ServerError, Routes } from '../lib';

const router = require('express').Router();

const controller: UserController = new UserController();

const create = async (req: Request, res: Response, next: any) => {
    try {
        return await controller.create(req, res);
    } catch (e: any) {
        if (e instanceof ClientError) {
            next(e);
        }
        next(new ServerError(e.message));
    }
    return undefined;
};
const update = async (req: Request, res: Response, next: any) => {
    try {
        return await controller.update(req, res);
    } catch (e: any) {
        if (e instanceof ClientError) {
            next(e);
        }
        next(new ServerError(e.message));
    }
    return undefined;
};

const deleteAction = async (req: Request, res: Response, next: any) => {
    try {
        return await controller.delete(req, res);
    } catch (e: any) {
        if (e instanceof ClientError) {
            next(e);
        }
        next(new ServerError(e.message));
    }
    return undefined;
};
const getById = async (req: Request, res: Response, next: any) => {
    try {
        return await controller.getById(req, res);
    } catch (e: any) {
        if (e instanceof ClientError) {
            next(e);
        }
        next(new ServerError(e.message));
    }
    return undefined;
};

const getByEmail = async (req: Request, res: Response, next: any) => {
    try {
        return await controller.getByEmail(req, res);
    } catch (e: any) {
        if (e instanceof ClientError) {
            next(e);
        }
        next(new ServerError(e.message));
    }
    return undefined;
};

const getExternalUsers = async (req: Request, res: Response, next: any) => {
    try {
        return await controller.getExternalUsers(req, res);
    } catch (e: any) {
        if (e instanceof ClientError) {
            next(e);
        }
        next(new ServerError(e.message));
    }
    return undefined;
};
const register = async (req: Request, res: Response, next: any) => {
    try {
        return await controller.register(req, res);
    } catch (e: any) {
        if (e instanceof ClientError) {
            next(e);
        }
        next(new ServerError(e.message));
    }
    return undefined;
};

const authenticate = async (req: Request, res: Response, next: any) => {
    try {
        return await controller.authenticate(req, res);
    } catch (e: any) {
        if (e instanceof ClientError) {
            next(e);
        }
        next(new ServerError(e.message));
    }
    return undefined;
};

export default (app: core.Express) => {
    router.route('/')
        .post(
            create,
        );

    router.route('/register')
        .post(
            register,
        );

    router.route('/authenticate')
        .post(
            authenticate,
        );

    router.route('/external')
        .get(
            getExternalUsers,
        );

    router.route('/email/:email')
        .get(
            getByEmail,
        );

    router.route('/:id')
        .put(
            update,
        );

    router.route('/:id')
        .get(
            getById,
        );

    router.route('/:id')
        .delete(
            deleteAction,
        );

    app.use(
        Routes.USERS,
        router,
    );
};
