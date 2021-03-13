import { BindService, UserModel } from '../../../lib';
import { UserRepository } from './user-repository';
import { InjectValue } from 'typescript-ioc';
import { User } from 'user-transport';
import {ConflictClientError, NotFoundClientError} from '../../../lib/http';

@BindService
export class UserService {
    @InjectValue('UserRepository')
    private readonly userRepository: UserRepository;

    public async create(user: User) {
        const resp = await this.getByEmail(user.email);
        if(resp){
            throw new ConflictClientError('The email already exist');
        }

        user.deleted = false;
        return await this.userRepository.create(user);
    }

    public async update(user: User) {
        let resp = await this.getById(user._id);
        if(!resp){
            throw new NotFoundClientError('The user you are trying to update does no exist');
        }
        resp = await this.getByEmail(user.email);
        if(resp){
            throw new ConflictClientError('The email already exist');
        }

        return await this.userRepository.update(user);
    }

    public async delete(id: string, deletedUser: string) {
        const user: any = await this.userRepository.findOneActiveById(id);
        if (!user) {
            throw new NotFoundClientError('The user you are trying to delete does no exist');
        }
        user.deleted = true;
        user.deletedUser = deletedUser;
        user.deletedAt = new Date();
        return await this.userRepository.softDelete(new UserModel(user));
    }

    public async getById(id: string) {
        return await this.userRepository.findOneActiveById(id);
    }

    public async getByEmail(email: string) {
        return await this.userRepository.findOneActiveByEmail(email);
    }

    public async getExternalUsers() {
        return await this.userRepository.findActiveExternalUsers();
    }
}
