import { NotFoundError } from "../utils/error.response.js";

class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(data, option) {
        return await this.model.create(data, option);
    }

    async bulkCreate(data, options) {
        return this.model.bulkCreate(data, options);
    }

    async get(options) {
        return await this.model.findOne(options);
    }

    async getById(id, options) {
        return await this.model.findByPk(id, options);
    }

    async getAll(options) {
        return await this.model.findAll(options);
    }

    async getAndCountAll(options) {
        return await this.model.findAndCountAll(options);
    }

    async findOneAndUpdate(where, data) {
        const record = await this.model.findOne({
            where: where,
        });
        if (record) {
            return await record.update(data);
        }
        return null
    }

    async updateById(id, data, options) {
        const record = await this.model.findByPk(id, options);
        if (record) {
            return record.update(data, options);
        }
        throw new NotFoundError("Record not found");
    }

    async update(data, options) {
        return this.model.update(data, options);
    }

    async deleteById(id, options) {
        return this.model.destroy({
            ...options,
            where: {
                id,
            },
        });
    }

    async removeById(id) {
        return this.model.destroy({
            where: {
                id
            },
            force: true
        })
    }

    async delete(options) {
        return this.model.destroy(options);
    }

    async count(options) {
        return this.model.count(options);
    }

    async sum(attribute, options) {
        return this.model.sum(attribute, options);
    }

    async max(attribute, options) {
        return this.model.max(attribute, options);
    }
}


export default BaseService;