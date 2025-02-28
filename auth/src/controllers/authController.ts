import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import dataSource from '../config/data-source';
import settings from '../config/config';


import { User } from '../models/user.entity';

import checkPassword from '../utils/checkPassword';


// Контроллер
class AuthController {
    // TODO: дописать сервис
    // private authService: AuthService

    // constructor(authService: AuthService = AuthService) {
    //     this.authService = authService
    // }

    register = async (request: any, response: any) => {
        const user = await dataSource.getRepository(User).create(request.body)
        const results = await dataSource.getRepository(User).save(user)

        return response.send(results)
    }

    auth = async (request: any, response: any) => {
        const { body } = request
        const { email, password } = body

        const userRepository = dataSource.getRepository(User)

        const user = await userRepository.findOneBy({ email })

        if (!user) {
            return response.status(401).send({ message: "User is not found" })
        }

        const userPassword = user.password

        const isPasswordCorrect = checkPassword(userPassword, password)

        if (!isPasswordCorrect) {
            return response.status(401).send({ message: "Password or login is incorrect" })
        }

        const accessToken = jwt.sign({ user: { id: user.id, userType: user.userType } }, settings.JWT_SECRET_KEY)

        return response.send({ accessToken })
    }

    verify = async (request: any, response: any) => {
        const { user } = request

        let isValid = false

        if (user) {
            isValid = true
        }

        return response.send({ isValid })

    }

    me = async (request: any, response: any) => {    
        const { user } = request

        const userRepository = dataSource.getRepository(User)
        const currentUser = await userRepository.findOneBy({ id: user.id })

        return response.send(currentUser)
    }
}

export default AuthController;
