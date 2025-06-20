import { IUserOptions } from "@/domain/entities/user.entity";
import { time } from "console";

export class UpdateUserDto {
    private constructor(
        public readonly name?: string,
        public readonly email?: string,
        public readonly password?: string,
        public readonly lastSeen?: string,
    ){}

    public get values(){
        const values: {[key: string]: any} = {};

        if(this.name) values.name = this.name;
        if(this.email) values.email = this.email;
        if(this.password) values.password= this.password;
        if(this.lastSeen) values.lastSeen = this.lastSeen;

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateUserDto?] {
        const {username, email, password, lastSeen} = props;

        //* Validations
        if(username){
            if(String(username).length < 8) return ["Username must be 8 on lenght"];
        }
        if(email){
            if(String(email).length < 8) return ["Email must be 8 on lenght"];
        }
        if(password){
            if(String(password).length < 6) return ["Password must be 8 on lenght"];
        }
    
        return [undefined, new UpdateUserDto(username, email, password, lastSeen)]
    }
}