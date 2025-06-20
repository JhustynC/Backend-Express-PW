import { CreateUserDto } from "@/domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "@/domain/dtos/user/update-user.dto";
import { AbsUserRepository } from "@/domain/repositories/user.repository";
import { CreateUser } from "@/domain/use-cases/user/create.use-case";
import { DeleteUser } from "@/domain/use-cases/user/delete.use-case";
import { GetUser } from "@/domain/use-cases/user/get-user.use-case";
import { GetAllUsers } from "@/domain/use-cases/user/get-users.use-case";
import { UpdateUser } from "@/domain/use-cases/user/update.use-case";
import { Request, Response, RequestHandler } from "express";

export class UserController {    
    constructor(private readonly userService: AbsUserRepository) {}

    public getUser: RequestHandler = (req, res) => {
        const {email} = req.params;
    
        new GetUser(this.userService)
        .execute(email)
        .then((user) => res.json(user))
        .catch((error) => res.status(500).json({error: error.message}))
    }

    public getUsers: RequestHandler = (req, res) => {
        new GetAllUsers(this.userService)
        .execute()
        .then((users) => res.json(users))
        .catch((error) => res.status(500).json({error: error.message}))
    }

    public createUser: RequestHandler = (req, res) => {
        const [error, user] = CreateUserDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }

        new CreateUser(this.userService)
        .execute(user!)
        .then((user) => res.json(user))
        .catch((error) => res.status(404).json({error: error.message}))
    }

    public updateUser: RequestHandler = (req, res) => {
        const { email } = req.params;
        const [error, user] = UpdateUserDto.create({ ...req.body, email });
        if (error) {
            res.status(400).json({ error });
            return;
        }

        new UpdateUser(this.userService)
        .execute(user!)
        .then((user) => res.json(user))
        .catch((error) => res.status(404).json({error: error.message}))
    }

    public deleteUser: RequestHandler = (req, res) => {
        const {email} = req.params;

        new DeleteUser(this.userService)
        .execute(email)
        .then((user) => res.json(user))
        .catch((error) => res.status(404).json({error: error.message}))
    }
}