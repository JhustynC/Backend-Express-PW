import { IUserOptions } from "@/domain/entities/user.entity";
import { time } from "console";

export class UpdateUserDto {
    private constructor(
        public readonly email: string,
        public readonly newEmail?: string,
        public readonly username?: string,
        public readonly password?: string,
        public readonly lastSeen?: string,
    ){}

    public get values(){
        const values: {[key: string]: any} = {};

        if(this.username) values.username = this.username;
        if(this.newEmail) values.email = this.newEmail;
        if(this.password) values.password = this.password;
        if(this.lastSeen) values.lastSeen = this.lastSeen;

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateUserDto?] {
        const {username, email, password, lastSeen, newEmail} = props;

        //* Validations
        if (username) {
            // const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
            // if (!usernameRegex.test(String(username))) {
            //     return ["Username must be 3-30 characters, only letters, numbers, and underscores allowed", undefined];
            // }
        }
        if (email) {
            // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            // if (!emailRegex.test(String(email))) {
            //     return ["Invalid email format", undefined];
            // }
        }
        if (password) {
            // At least 8 chars, one uppercase, one lowercase, one number, one special char
        //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        //     if (!passwordRegex.test(String(password))) {
        //         return ["Password must be at least 8 characters, include uppercase, lowercase, number, and special character", undefined];
        //     }
        }
    
        return [undefined, new UpdateUserDto(email, newEmail, username, password, lastSeen)]
    }
}