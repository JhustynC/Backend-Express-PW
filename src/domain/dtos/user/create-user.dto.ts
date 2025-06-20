import { IUserOptions } from "@/domain/entities/user.entity";

export class CreateUserDto {
    private constructor(
        readonly username: string, 
        readonly email: string, 
        readonly password: string, 
        readonly lastSeen?: Date ){}

    static create(props: Partial<IUserOptions>): [string?, CreateUserDto?]{
        const {username, email, password, lastSeen} = props;
        
        //*Validations
        if(!username) return ['Username is required', undefined];
        if(!email) return ['Email is required', undefined];
        if(!password) return ['Password is required', undefined];
        // if(lastSeen) return ['LastSeen is required', undefined];
        
        return [undefined, new CreateUserDto(
            username,
            email,
            password,
            lastSeen || new Date()
        )];
    }
}