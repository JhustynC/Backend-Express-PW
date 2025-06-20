import { CreateUserDto } from "@/domain/dtos/user/create-user.dto";
import { UserEntity } from "@/domain/entities/user.entity";
import { AbsUserRepository } from "@/domain/repositories/user.repository";

export class GetUser {
    constructor(public readonly repository: AbsUserRepository){}

    async execute(email: string): Promise<UserEntity | undefined>{
        return await this.repository.getByEmail(email);
    }
}