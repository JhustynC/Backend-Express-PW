import { UserModel } from "@/cofig/data/mongo/models/user.model";
import { AbsUserDatasource } from "@/domain/datasources/user.datasource";
import { CreateUserDto } from "@/domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "@/domain/dtos/user/update-user.dto";
import { UserEntity } from "@/domain/entities/user.entity";


export class UserDatasourceImp implements AbsUserDatasource{
    async saveUser(user: CreateUserDto): Promise<UserEntity> {
        const newUser = await UserModel.create(user);
        return newUser; 
    }
    async getByEmail(email: string): Promise<UserEntity | undefined> {
        const user = await UserModel.findOne({ email });
        if (!user) return undefined;
        return user;
    }
    async getAll(): Promise<UserEntity[]> {
        const users = await UserModel.find();
        return users.map((user: any) => UserEntity.fromObject(user));
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity | undefined> {
        // currentEmail es el email actual del usuario (viene de la URL o del DTO)
        const currentEmail = updateUserDto.email;
        const newEmail = updateUserDto.newEmail;

        // Construir los campos a actualizar
        const updateFields: any = { ...updateUserDto.values };

        // Si se quiere cambiar el email, verificar que el nuevo email no esté en uso
        if (newEmail && newEmail !== currentEmail) {
            const exists = await UserModel.findOne({ email: newEmail });
            if (exists) throw new Error("The new email is already in use");
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { email: currentEmail },
            { $set: updateFields },
            { new: true }
        );
        if (!updatedUser) return undefined;
        return UserEntity.fromObject(updatedUser);
    }

    async deleteUser(email: string): Promise<UserEntity> {
        const deletedUser = await UserModel.findOneAndDelete({ email });
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return UserEntity.fromObject(deletedUser);
    }

}