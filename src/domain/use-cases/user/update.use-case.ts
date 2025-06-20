import { CreateUserDto } from "@/domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "@/domain/dtos/user/update-user.dto";
import { UserEntity } from "@/domain/entities/user.entity";
import { AbsUserRepository } from "@/domain/repositories/user.repository";

export class UpdateUser {
    constructor(public readonly repository: AbsUserRepository){}

    async execute(dto: UpdateUserDto): Promise<UserEntity | undefined>{
        return await this.repository.updateUser(dto);
    }
}