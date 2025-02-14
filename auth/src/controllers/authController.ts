import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import dataSource from '../config/data-source';
import settings from '../config/config';


import { User } from '../models/user.entity';

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

        const userPassword = user.password

        if (password !== userPassword) {
            return response.status(401).send({ message: "Password or login is incorrect" })
        }

        const accessToken = jwt.sign({ user: { id: user.id, userType: user.userType } }, settings.JWT_SECRET_KEY)

        return response.send({ accessToken })
    }

    verify = async (request: any, response: any) => {
        const { body } = request
        const { accessToken } = body

        let isValid = false

        try {
            jwt.verify(accessToken, settings.JWT_SECRET_KEY)
            isValid = true
        } catch (e) {
            return response.status(401).send({ message: "Invalid signature" })
        }

        return response.send({ isValid })
    }

    me = async (request: any, response: any) => {
        const { headers } = request
        const { authorization } = headers

        try {
            const [, accessToken] = authorization.split(' ')

            const { user } = jwt.verify(accessToken, settings.JWT_SECRET_KEY)

            const userRepository = dataSource.getRepository(User)
            const currentUser = await userRepository.findOneBy({ id: user.id })

            return response.send(currentUser)

        } catch (e) {
            return response.status(400).send({ message: "Error" })

        }
    }
}

export default AuthController;
