import { Domain, IDomain } from '../models/Domain';
import { getStorageItem } from '../storage';
import IRepository from './IRepository';

export default class DomainRepository implements IRepository {
    collectionId = 'domains';

    async getAll(): Promise<Domain[]> {
        return (await getStorageItem(this.collectionId)).map(
            (domain: IDomain) => new Domain(domain),
        );
    }
}
