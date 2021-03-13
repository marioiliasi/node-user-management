import { InjectValue } from "typescript-ioc";
import { UserService } from "./user-service";

export class UserController {
    @InjectValue('UserService')
    private readonly service: UserService;

    public async test(){
        await this.service.test();
    }
}
