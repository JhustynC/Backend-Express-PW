import { Router } from "express";
import { UserController } from "./user.controller";
import { AbsUserRepository } from "@/domain/repositories/user.repository";
import { UserDatasourceImp } from "@/infrastructure/datasources/user.datasource.imp";
import { UserRepositoryImp } from "@/infrastructure/repositories/user.repository.imp";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const userDatasource = new UserDatasourceImp();
        const userRepository: AbsUserRepository = new UserRepositoryImp(userDatasource);
        const userController = new UserController(userRepository);

        router.get('/', userController.getUsers);
        router.get('/:email', userController.getUser);
        router.post("/", userController.createUser);
        router.put("/:email", userController.updateUser);
        router.delete('/:email', userController.deleteUser);
        
        return router;
    }
}