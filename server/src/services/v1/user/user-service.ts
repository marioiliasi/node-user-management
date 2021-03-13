import { BindService } from "@lib";

@BindService
export class UserService {
    public async test(){
        console.log('bla');
    }
}
