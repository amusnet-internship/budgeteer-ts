import { api } from "./request";
import { Record, Storage } from "./Storage";


export class RemoteStorage implements Storage {
    async getAll(collectionName: string): Promise<Record[]> {
        const data = await api.get('/jsonstore/demo/' + collectionName);
        return Object.values(data).map(this.parse.bind(this));
    }

    async getById(collectionName: string, id: string): Promise<Record> {
        const result = await api.get(`/jsonstore/demo/${collectionName}/${id}`);
        return this.parse(result);
    }

    async create(collectionName: string, data: any): Promise<Record> {
        const result = await api.post('/jsonstore/demo/' + collectionName, data);
        return this.parse(result);
    }

    async update(collectionName: string, id: string, data: any): Promise<Record> {
        const record = Object.assign({}, data, { id });
        const result = await api.put(`/jsonstore/demo/${collectionName}/${id}`, this.serialize(record));
        return this.parse(result);
    }

    async delete(collectionName: string, id: string): Promise<void> {
        await api.delete(`/jsonstore/demo/${collectionName}/${id}`);
    }

    private parse(record: any): Record {
        record.id = record._id;
        delete record._id;
        return record;
    }

    private serialize(record: Record): any {
        const result = Object.assign({}, record) as any;
        result._id = result.id;
        delete result.id;
        return result;
    }
}