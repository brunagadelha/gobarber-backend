import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import { injectable, inject } from "tsyringe";

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {

    constructor(@inject('UsersRepository') private usersRepository: IUsersRepository){}

    public async execute({ name, email, password }: Request): Promise<User> {

        const checkuserExists = await this.usersRepository.findByEmail(email);

        if (checkuserExists) throw new AppError('Email address already used');

        const hashedPassword = await hash(password, 8);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
