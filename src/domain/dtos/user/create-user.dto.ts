import { IUserOptions } from "@/domain/entities/user.entity";

export class CreateUserDto {
    private constructor(public readonly userOptions: IUserOptions ){}

    static create(props: {[key: string]: any}): [string?, CreateUserDto?]{
        const {username, email, password, lastSeen} = props;
        
        //*Validations
        if(username) return ['Username is required', undefined];
        if(email) return ['Email is required', undefined];
        if(password) return ['Password is required', undefined];
        if(lastSeen) return ['LastSeen is required', undefined];
        
        return [undefined, new CreateUserDto({username, password, email, lastSeen})];
    }
}