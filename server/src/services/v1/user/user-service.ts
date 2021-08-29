import { InjectValue } from 'typescript-ioc';
import jwt from 'jsonwebtoken';
import { BindService, jwtSecret, ConflictClientError, NotFoundClientError } from '../../../lib';
import { UserRepository } from './user-repository';
import { User } from '../../../lib/models/user';

@BindService
export class UserService {
    @InjectValue('UserRepository')
    private readonly userRepository: UserRepository;

    public async authenticate(credentials: { email: string, passwordEncrypted: string }) {
        const resp: any = await this.getByEmail(credentials.email);
        if (!resp) {
            throw new ConflictClientError('Wrong Credentials!');
        }
        const user: any = resp._doc;
        if (user.passwordEncrypted === credentials.passwordEncrypted) {
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            }, jwtSecret, { expiresIn: '7d' });
            return {
                token,
            };
        }
        throw new ConflictClientError('Wrong Credentials!');
    }

    public async create(user: User) {
        const resp = await this.getByEmail(user.email);
        if (resp) {
            throw new ConflictClientError('The email already exist');
        }

        user.deleted = false;
        return this.userRepository.create(user);
    }

    public async update(user: User) {
        let resp = await this.getById(user._id);
        if (!resp) {
            throw new NotFoundClientError('The user you are trying to update does no exist');
        }
        resp = await this.getByEmail(user.email);
        if (resp && resp._id.toString() !== user._id) {
            throw new ConflictClientError('The email already exist');
        }

        return this.userRepository.update(user);
    }

    public async delete(id: string, deletedUser: string) {
        const user: any = await this.userRepository.findOneActiveById(id);
        if (!user) {
            throw new NotFoundClientError('The user you are trying to delete does no exist');
        }
        user.deleted = true;
        user.deletedUser = deletedUser;
        user.deletedAt = new Date();
        return this.userRepository.softDelete(<any>{
            _id: user._id,
        });
    }

    public async getById(id: string) {
        return this.userRepository.findOneActiveById(id);
    }

    public async getByEmail(email: string) {
        return this.userRepository.findOneActiveByEmail(email);
    }

    public async getExternalUsers() {
        let users = await this.userRepository.findActiveExternalUsers();
        if (users) {
            users = users.map((user: any) => {
                delete user._doc.passwordEncrypted;
                return user;
            });
        }
        return users;
    }
}
