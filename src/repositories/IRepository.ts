export default interface IRepository {
  collectionId: string;

  getAll(): Promise<any[]>;
};