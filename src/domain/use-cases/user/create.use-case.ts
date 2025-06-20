import { CreateUserDto } from "@/domain/dtos/user/create-user.dto";
import { UserEntity } from "@/domain/entities/user.entity";
import { AbsUserRepository } from "@/domain/repositories/user.repository";

export class CreateUser {
    constructor(public readonly repository: AbsUserRepository){}

    async execute(dto: CreateUserDto): Promise<UserEntity>{
        return await this.repository.saveUser(dto);
    }
}