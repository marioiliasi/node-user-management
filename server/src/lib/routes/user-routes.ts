import * as core from 'express-serve-static-core';
import { Routes } from '../../lib';
import { UserController } from '../../services/v1/user/user-controller';
import {Request, Response} from "express";
import {ClientError, ServerError} from "../http/index";

const router = require('express').Router();

const controller: UserController = new UserController();

const create = async(req: Request, res: Response, next: any) => {
    try{
        return await controller.create(req, res);
    } catch (e){
        if(e instanceof ClientError){
            next(e);
        }
        next(new ServerError(e.message));
    }
}
const update = async(req: Request, res: Response, next: any) => {
    try{
        return await controller.update(req, res);
    } catch (e){
        if(e instanceof ClientError){
            next(e);
        }
        next(new ServerError(e.message));
    }
}

const deleteAction = async(req: Request, res: Response, next: any) => {
    try{
        return await controller.delete(req, res);
    } catch (e){
        if(e instanceof ClientError){
            next(e);
        }
        next(new ServerError(e.message));
    }
}
const getById = async(req: Request, res: Response, next: any) => {
    try{
        return await controller.getById(req, res);
    } catch (e){
        if(e instanceof ClientError){
            next(e);
        }
        next(new ServerError(e.message));
    }
}

const getByEmail = async(req: Request, res: Response, next: any) => {
    try{
        return await controller.getByEmail(req, res);
    } catch (e){
        if(e instanceof ClientError){
            next(e);
        }
        next(new ServerError(e.message));
    }
}

const getExternalUsers = async(req: Request, res: Response, next: any) => {
    try{
        return await controller.getExternalUsers(req, res);
    } catch (e){
        if(e instanceof ClientError){
            next(e);
        }
        next(new ServerError(e.message));
    }
}
const register = async(req: Request, res: Response, next: any) => {
    try{
        return await controller.register(req, res);
    } catch (e){
        if(e instanceof ClientError){
            next(e);
        }
        next(new ServerError(e.message));
    }
}

const authenticate = async(req: Request, res: Response, next: any) => {
    try{
        return await controller.authenticate(req, res);
    } catch (e){
        if(e instanceof ClientError){
            next(e);
        }
        next(new ServerError(e.message));
    }
}

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
