import {InjectValue} from 'typescript-ioc';
import {Request, Response} from 'express';
import { User, UserRole } from '../../../lib/models/user';
import {BadRequestClientError, ok} from '../../../lib/http';
import {UserService} from './user-service';

export class UserController {
    @InjectValue('UserService')
    private readonly service: UserService;

    public async create(req: Request, res: Response) {
        const user: User = req.body;

        user.createdUser = UserController.getCreatedUser(req);
        user.role = UserRole.EXTERNAL;

        const result = await this.service.create(user);

        return ok(result, res);
    }

    public async register(req: Request, res: Response) {
        const user: User = req.body;

        user.createdUser = UserController.getCreatedUser(req);
        user.role = UserRole.INTERNAL;

        const result = await this.service.create(user);

        return ok(result, res);
    }

    public async authenticate(req: Request, res: Response) {
        const credentials: { email: string, passwordEncrypted: string } = req.body;

        const result = await this.service.authenticate(credentials);

        return ok(result, res);
    }

    public async update(req: Request, res: Response) {
        const user: User = req.body;

        user._id = UserController.getId(req);
        user.updatedUser = UserController.getCreatedUser(req);

        const result = await this.service.update(user);

        return ok(result, res);
    }

    public async getById(req: Request, res: Response) {
        const result = await this.service.getById(UserController.getId(req));

        return ok(result, res);
    }

    public async getByEmail(req: Request, res: Response) {
        const result = await this.service.getByEmail(UserController.getEmail(req));

        return ok(result, res);
    }

    public async delete(req: Request, res: Response) {
        const result = await this.service.delete(UserController.getId(req), UserController.getCreatedUser(req));

        return ok(result, res);
    }

    public async getExternalUsers(req: Request, res: Response) {
        const result = await this.service.getExternalUsers();

        return ok(result, res);
    }

    private static getCreatedUser(req: Request): string {
        return 'register';
    }

    private static getId(req: Request): string {
        return this.getFieldFromParams(req, 'id');
    }

    private static getEmail(req: Request): string {
        return this.getFieldFromParams(req, 'email');
    }

    private static getFieldFromParams(req: Request, field: string): string {
        const params: any = req.params;
        if (!params[field]) {
            throw new BadRequestClientError("Please provide the id of the user you're trying to update");
        }
        return params[field];
    }
}
