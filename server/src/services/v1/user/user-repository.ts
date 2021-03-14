import { BindService, UserModel, UserSchema } from '../../../lib';
import * as mongoose from 'mongoose';
import { User, UserRole } from '../../../lib/models/user';

@BindService
export class UserRepository {
    private model: mongoose.Model<mongoose.Document> = UserModel;

    async create(item: User): Promise<User> {
        const resp: any = await this.model.create(new UserModel(item));
        return resp._doc;
    }

    async update(item: User): Promise<mongoose.Document | null> {
        await this.model.updateOne({_id: item._id, deleted: false}, new UserModel(item), {upsert: true});
        return await this.findOneActiveById(item._id);
    }

    async softDelete(item: User): Promise<mongoose.Document | null> {
        await this.model.findOneAndUpdate({_id: item._id, deleted: false}, new UserModel(item));
        return await this.findById(item._id);
    }

    async findOneActiveById(id: string): Promise<mongoose.Document | null> {
        return this.model.findOne({_id: id, deleted: false});
    }

    async findById(id: string): Promise<mongoose.Document | null> {
        return this.model.findById(id);
    }

    async findOneActiveByEmail(email: string): Promise<mongoose.Document | null> {
        return this.model.findOne({ email, deleted: false });
    }

    async findActiveExternalUsers(): Promise<mongoose.Document[] | null> {
        return this.model.find({role:UserRole.EXTERNAL, deleted: false});
    }

}
