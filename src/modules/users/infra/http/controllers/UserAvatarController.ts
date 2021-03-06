import { Request, Response } from 'express';
import { container } from "tsyringe";

import UpdateUserAvatarService from 'modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    constructor() {
    }

    public async create(request:Request, response:Response):Promise<Response> {
        const updateAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;
        return response.json(user);
    }

}
