import { ILike, Raw } from "typeorm"

import dataSource from '../config/data-source';
import { StudentQueue } from "../models/student-queue.entity";


class StudentQueueController {
    private studentQueueRepository = dataSource.getRepository(StudentQueue)

    create = async (request: any, response: any) => {
        const { body } = request

        const instance = this.studentQueueRepository.create(body)
        const result = await this.studentQueueRepository.save(instance)

        return response.send(result)
    }

    update = async (request: any, response: any) => {
        const { params, body } = request;
        const { id } = params;

        const instance = await this.studentQueueRepository.findOneBy({ id });

        for (const key in body) {
            instance[key] = body[key];
        }

        const result = await this.studentQueueRepository.save(instance);

        return response.send(result);
    }

    delete = async (request: any, response: any) => {
        const { params } = request;
        const { id } = params;

        const instance = await this.studentQueueRepository.findOneBy({ id });
        await this.studentQueueRepository.remove(instance);

        return response.status(204).send({});
    }

    get = async (request: any, response: any) => {
        const { params } = request;
        const { id } = params;

        const result = await this.studentQueueRepository.findOneBy({ id });

        return response.send(result);
    }

    list = async (request: any, response: any) => {
        const { query } = request

        const findOptions: any = {}

        if (query.task) {
            findOptions.task = ILike(`%${query.task}%`)
        }

        const result = await this.studentQueueRepository.find({
            where: findOptions
        })

        return response.send(result)
    }
}

export default StudentQueueController;
