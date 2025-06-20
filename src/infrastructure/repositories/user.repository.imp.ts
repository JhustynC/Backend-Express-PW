import { AbsUserDatasource } from "@/domain/datasources/user.datasource";
import { CreateUserDto } from "@/domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "@/domain/dtos/user/update-user.dto";
import { UserEntity } from "@/domain/entities/user.entity";
import { AbsUserRepository } from "@/domain/repositories/user.repository";


export class UserRepositoryImp implements AbsUserRepository{
    constructor(private readonly datasource: AbsUserDatasource){}

    saveUser(user: CreateUserDto): Promise<UserEntity> {
        return this.datasource.saveUser(user);
    }
    getByEmail(email: string): Promise<UserEntity | undefined> {
        return this.getByEmail(email);
    }
    getAll(): Promise<UserEntity[]> {
        return this.getAll();
    }
    updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity | undefined> {
        return this.updateUser(updateUserDto);
    }
    deleteUser(email: string): Promise<UserEntity> {
        return this.deleteUser(email);
    }

}