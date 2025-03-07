import { ILike } from "typeorm"

import dataSource from '../config/data-source';
import { Student } from "../models/student.entity";


class StudentController {
    private studentRepository = dataSource.getRepository(Student)

    create = async (request: any, response: any) => {
        const { body } = request

        const instance = this.studentRepository.create(body)
        const result = await this.studentRepository.save(instance)

        return response.send(result)
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;

        const instance = await this.studentRepository.findOneBy({ id });

        for (const key in body) {
            instance[key] = body[key];
        }

        const result = await this.studentRepository.save(instance);

        return response.send(result);
    }

    delete = async (request: any, response: any) => {
        const { params } = request;
        const { id } = params;

        const instance = await this.studentRepository.findOneBy({ id });
        await this.studentRepository.remove(instance);

        return response.status(204).send({});
    }

    get = async (request: any, response: any) => {
        const { params } = request;
        const { id } = params;

        const result = await this.studentRepository.findOneBy({ id });

        return response.send(result);
    }

    list = async (request: any, response: any) => {
        const { query } = request

        const findOptions: any = {}

        if (query.group) {
            findOptions.group = ILike(`%${query.group}%`)
        }

        const result = await this.studentRepository.find({
            where: findOptions
        })

        return response.send(result)
    }
}

export default StudentController;
