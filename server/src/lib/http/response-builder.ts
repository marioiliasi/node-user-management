import { Request, Response } from 'express';
import { LOGGER } from '../logger';
import { ClientError } from './client-errors';
import { HttpStatusCode } from './http-status-codes';

const build = (result: any): any => result;

const handle = (req: Request, res: Response): any => {
  try {
    res.send(build(req.body));
    return res;
  } catch (err: any) {
    LOGGER.error(err);
    if (err instanceof ClientError) {
      LOGGER.debug(`ResponseBuilder: Building response for client error of type ${err.name} statusCode ${err.statusCode} message: ${err.description}`);
      res.status(err.statusCode).send(build({ statusCode: err.statusCode, description: err.description }));
      return res;
    }
    LOGGER.debug(`ResponseBuilder: Building generic 500 Internal Server Error response for unknown error of type ${err.name} with internal message: ${err.message}`);
    res.status(HttpStatusCode.InternalServerError).send(build({ statusCode: err.statusCode, description: 'Internal Server Error' }));
    return res;
  }
};

const ok = (result: any, res: Response): any => {
  res.status(HttpStatusCode.Ok).send(build(result));
  return res;
};

const error = (err: Error, req: Request, res: Response, next: any): any => {
  if (!err) {
    next();
  }
  LOGGER.error(err);
  if (err instanceof ClientError) {
    LOGGER.debug(`ResponseBuilder: Building response for client error of type ${err.name} statusCode ${err.statusCode} message: ${err.description}`);
    res.status(err.statusCode).send(build({ description: err.description }));
    return res;
  }
  LOGGER.debug(`ResponseBuilder: Building generic 500 Internal Server Error response for unknown error of type ${err.name} with internal message: ${err.message}`);
  res.status(HttpStatusCode.InternalServerError).send(build({ description: err.message }));
  return res;
};

export {
    handle,
    build,
    ok,
    error,
};
