import { Form, IForm } from './Form';

export interface IDomain {
    id: string;
    title: string;
    forms: Form[];
    allowedHostNames: string[];
}

export class Domain implements IDomain {
    id: string;
    title: string;
    forms: Form[];
    allowedHostNames: string[];

    constructor(data: IDomain) {
        this.fromDb(data);
    }

    fromDb(data: IDomain) {
        this.id = data.id;
        this.forms = data.forms.map((form: IForm) => new Form(form));
        this.title = data.title;
        this.allowedHostNames = data.allowedHostNames;
    }
}
