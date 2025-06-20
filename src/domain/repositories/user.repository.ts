import { UserEntity } from "../entities/user.entity"
import { UpdateUserDto } from "../dtos/user/update-user.dto"
import { CreateUserDto } from "../dtos/user/create-user.dto"

export abstract class AbsUserRepository{
    abstract saveUser(user: CreateUserDto): Promise<UserEntity>; 
    abstract getByEmail(email: string): Promise<UserEntity | undefined>;
    abstract getAll(): Promise<UserEntity[]>;
    abstract updateUser(updateUserDto: UpdateUserDto):Promise<UserEntity | undefined>;
    abstract deleteUser(email: string):Promise<UserEntity>;
}