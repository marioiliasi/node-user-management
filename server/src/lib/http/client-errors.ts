// eslint-disable-next-line max-classes-per-file
import { LOGGER } from '../logger';
import { HttpStatusCode } from './http-status-codes';

export abstract class ClientError extends Error {
  public statusCode: HttpStatusCode;

  public description: any;

  protected constructor(description: any, statusCode: HttpStatusCode = HttpStatusCode.InternalServerError) {
    super(JSON.stringify(description));
    this.statusCode = statusCode;
    this.description = description;
    LOGGER.info(`ClientError: ${this.stack}`);
  }
}

export class ConflictClientError extends ClientError {
  constructor(description: any = 'Cannot create object, because one like it already exists') {
    super(description, HttpStatusCode.Conflict);
  }
}

export class NotFoundClientError extends ClientError {
  constructor(description: any = 'No items found for given parameters') {
    super(description, HttpStatusCode.NotFound);
  }
}

export class BadRequestClientError extends ClientError {
  constructor(description: any = 'Bad request') {
    super(description, HttpStatusCode.BadRequest);
  }
}
