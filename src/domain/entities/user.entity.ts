import { UserModel } from "@/cofig/data/mongo/models/user.model";

export interface IUserOptions{
    readonly username: string, 
    readonly email: string, 
    readonly password: string, 
    readonly lastSeen?: Date 
}

export class UserEntity {
    username: string;
    email: string;
    password: string;
    lastSeen: Date | undefined;

    constructor({username, email, password, lastSeen}: IUserOptions){
        this.username =  username;
        this.email = email;
        this.password = password; 
        this.lastSeen = lastSeen;
    }

    static fromObject(mongoObject: {[key: string]: any}): UserEntity {
        const { username, email, password, lastSeen, _id } = mongoObject;
        
        if (!username || !email || !password) {
            throw new Error("Username,Email and Password are required");
        }

        return new UserEntity({
            username, // Map from mongo's userName to entity's username
            email,
            password,
            lastSeen: lastSeen ? new Date(lastSeen) : undefined
        });
    }
}